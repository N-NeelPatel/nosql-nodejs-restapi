const request = require("supertest");
const app = require("../server.js");
const Subscriber = require("../models/subscriber");

describe("GET /", () => {
  it("should return a list of subscribers", async () => {
    // Arrange
    const expectedSubscribers = [
      { name: "John Doe", email: "johndoe@example.com" },
      { name: "Jane Smith", email: "janesmith@example.com" },
    ];
    jest.spyOn(Subscriber, "find").mockResolvedValue(expectedSubscribers);

    // Act
    const response = await request(app).get("/");

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedSubscribers);
  });

  it("should return a 500 status code if there is an error", async () => {
    // Arrange
    const errorMessage = "Internal Server Error";
    jest.spyOn(Subscriber, "find").mockRejectedValue(new Error(errorMessage));

    // Act
    const response = await request(app).get("/");

    // Assert
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: errorMessage });
  });
});

describe("GET /:id", () => {
  const subscriberId = "1234";
  const expectedSubscriber = {
    _id: subscriberId,
    name: "John Doe",
    email: "johndoe@example.com",
  };

  beforeEach(() => {
    jest.spyOn(Subscriber, "findById").mockImplementation((id) => {
      return id === subscriberId ? expectedSubscriber : null;
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should return a subscriber when given a valid id", async () => {
    // Arrange
    const expectedResponse = {
      _id: subscriberId,
      name: "John Doe",
      email: "johndoe@example.com",
    };

    // Act
    const response = await request(app).get(`/${subscriberId}`);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedResponse);
  });

  it("should return a 404 status code when given an invalid id", async () => {
    // Arrange
    const invalidSubscriberId = "5678";

    // Act
    const response = await request(app).get(`/${invalidSubscriberId}`);

    // Assert
    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      message: `Subscriber with id ${invalidSubscriberId} not found`,
    });
  });

  it("should call the getSubscriber middleware", async () => {
    // Act
    const response = await request(app).get(`/${subscriberId}`);

    // Assert
    expect(response.status).toBe(200);
    expect(Subscriber.findById).toHaveBeenCalledWith(subscriberId);
  });
});

describe("POST /", () => {
  const subscriberData = {
    name: "John Doe",
    subscribedToChannel: "Example Channel",
  };

  beforeEach(() => {
    jest.spyOn(Subscriber.prototype, "save").mockResolvedValue(subscriberData);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should create a new subscriber", async () => {
    // Arrange
    const expectedResponse = { _id: expect.any(String), ...subscriberData };

    // Act
    const response = await request(app).post("/").send(subscriberData);

    // Assert
    expect(response.status).toBe(201);
    expect(response.body).toEqual(expectedResponse);
  });

  it("should return a 400 status code if there are validation errors", async () => {
    // Arrange
    const errorMessage = "Validation Error";
    jest
      .spyOn(Subscriber.prototype, "save")
      .mockRejectedValue(new Error(errorMessage));

    // Act
    const response = await request(app).post("/").send(subscriberData);

    // Assert
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: errorMessage });
  });
});

describe("PATCH /:id", () => {
  const subscriberData = {
    _id: "123",
    name: "John Doe",
    subscribedToChannel: "Example Channel",
  };

  beforeEach(() => {
    jest.spyOn(Subscriber, "findById").mockResolvedValue(subscriberData);
    jest.spyOn(subscriberData, "save").mockResolvedValue(subscriberData);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should update a subscriber", async () => {
    // Arrange
    const updateData = { subscribedToChannel: "New Channel" };
    const expectedResponse = {
      _id: subscriberData._id,
      name: subscriberData.name,
      ...updateData,
    };

    // Act
    const response = await request(app)
      .patch(`/${subscriberData._id}`)
      .send(updateData);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expectedResponse);
  });

  it("should return a 400 status code if there are validation errors", async () => {
    // Arrange
    const updateData = { name: "New Name", subscribedToChannel: "New Channel" };
    const errorMessage = "Validation Error";
    jest
      .spyOn(subscriberData, "save")
      .mockRejectedValue(new Error(errorMessage));

    // Act
    const response = await request(app)
      .patch(`/${subscriberData._id}`)
      .send(updateData);

    // Assert
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ message: errorMessage });
  });
});

describe("DELETE /:id", () => {
  const subscriberData = {
    _id: "123",
    name: "John Doe",
    subscribedToChannel: "Example Channel",
  };

  beforeEach(() => {
    jest.spyOn(Subscriber, "findById").mockResolvedValue(subscriberData);
    jest.spyOn(subscriberData, "remove").mockResolvedValue();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should delete a subscriber", async () => {
    // Arrange

    // Act
    const response = await request(app).delete(`/${subscriberData._id}`);

    // Assert
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ message: "Deleted Subscriber" });
    expect(Subscriber.findById).toHaveBeenCalledWith(subscriberData._id);
    expect(subscriberData.remove).toHaveBeenCalled();
  });

  it("should return a 500 status code if there is an error while deleting the subscriber", async () => {
    // Arrange
    const errorMessage = "Error deleting subscriber";
    jest
      .spyOn(subscriberData, "remove")
      .mockRejectedValue(new Error(errorMessage));

    // Act
    const response = await request(app).delete(`/${subscriberData._id}`);

    // Assert
    expect(response.status).toBe(500);
    expect(response.body).toEqual({ message: errorMessage });
  });
});
