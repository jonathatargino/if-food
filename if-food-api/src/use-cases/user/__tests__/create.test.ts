import { UserRole } from "@domain/user";
import { makeCreateUser } from "../create";
import { UseCaseError } from "@utils/errors";

describe("createUser", () => {
    it("should throw error when the email is already being used", async () => {
        const mockEmail = "john.doe@example.com";
        const userRepositoryMock = {
            create: jest.fn(),
            findByEmail: jest.fn().mockResolvedValue({
                id: "1",
                name: "John Doe",
                email: mockEmail,
            }),
            findByPhone: jest.fn().mockResolvedValue(null),
        };
        const userDataMock = {
            name: "Jane Doe",
            email: mockEmail,
            password: "123456",
            role: UserRole.Customer,
            phone: "80028922",
        };

        const createUser = makeCreateUser(
            userRepositoryMock.create,
            userRepositoryMock.findByEmail,
            userRepositoryMock.findByPhone,
        );

        expect(createUser(userDataMock)).rejects.toThrow(UseCaseError);
    });

    it("should throw error when the phone is already being used", async () => {
        const mockPhone = "80028922";
        const userRepositoryMock = {
            create: jest.fn(),
            findByEmail: jest.fn().mockResolvedValue(null),
            findByPhone: jest.fn().mockResolvedValue({
                id: "1",
                name: "John Doe",
                email: "john.doe@example.com",
                phone: mockPhone,
            }),
        };

        const userDataMock = {
            name: "Jane Doe",
            email: "jane.doe@example.com",
            password: "123456",
            role: UserRole.Customer,
            phone: mockPhone,
        };

        const createUser = makeCreateUser(
            userRepositoryMock.create,
            userRepositoryMock.findByEmail,
            userRepositoryMock.findByPhone,
        );

        expect(createUser(userDataMock)).rejects.toThrow(UseCaseError);
    });

    it("should create a user", async () => {
        const userDataMock = {
            name: "Jane Doe",
            email: "jane.doe@example.com",
            password: "123456",
            role: UserRole.Customer,
            phone: "80028922",
        };

        const expectedUser = {
            ...userDataMock,
            password: undefined,
        };

        const userRepositoryMock = {
            create: jest.fn().mockResolvedValue(expectedUser),
            findByEmail: jest.fn().mockResolvedValue(null),
            findByPhone: jest.fn().mockResolvedValue(null),
        };

        const createUser = makeCreateUser(
            userRepositoryMock.create,
            userRepositoryMock.findByEmail,
            userRepositoryMock.findByPhone,
        );

        const user = await createUser(userDataMock);

        expect(user).toEqual(expectedUser);
    });
});
