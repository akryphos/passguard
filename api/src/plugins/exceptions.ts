import { NotFoundError } from "elysia";

class BadGatewayException extends Error {
  code = "BAD_GATEWAY";
  status = 502;
  constructor(message?: string) {
    super(message ?? "The upstream server returned an invalid response.");
    this.name = "BAD_GATEWAY";
  }
}

class BadRequestException extends Error {
  code = "BAD_REQUEST";
  status = 400;
  constructor(message?: string) {
    super(
      message ?? "The request is invalid. Please check the data you've entered."
    );
    this.name = "BAD_REQUEST";
  }
}

class ConflictException extends Error {
  code = "CONFLICT";
  status = 409;
  constructor(message?: string) {
    super(
      message ??
        "The request could not be completed due to a conflict with the current state of the target resource."
    );
    this.name = "CONFLICT";
  }
}

class ForbiddenException extends Error {
  code = "FORBIDDEN";
  status = 403;
  constructor(message?: string) {
    super(
      message ??
        "You do not have access rights to this resource. Please check your permissions."
    );
    this.name = "FORBIDDEN";
  }
}

class ImATeapotException extends Error {
  code = "IM_A_TEAPOT";
  status = 418;
  constructor(message?: string) {
    super(
      message ?? "I'm a teapot. This request cannot be handled by a coffee pot."
    );
    this.name = "IM_A_TEAPOT";
  }
}

class InternalServerErrorException extends Error {
  code = "INTERNAL_SERVER_ERROR";
  status = 500;
  constructor(message?: string) {
    super(
      message ??
        "An internal server error has occurred. Please contact the administrator."
    );
    this.name = "INTERNAL_SERVER_ERROR";
  }
}

class MethodNotAllowedException extends Error {
  code = "METHOD_NOT_ALLOWED";
  status = 405;
  constructor(message?: string) {
    super(
      message ??
        "The HTTP method is not allowed. Please check the request method."
    );
    this.name = "METHOD_NOT_ALLOWED";
  }
}

class NotFoundException extends NotFoundError {
  constructor(message?: string) {
    super(message ?? "The requested resource was not found.");
    this.name = "NOT_FOUND";
  }
}

class NotImplementedException extends Error {
  code = "NOT_IMPLEMENTED";
  status = 501;
  constructor(message?: string) {
    super(message ?? "The requested functionality is not implemented.");
    this.name = "NOT_IMPLEMENTED";
  }
}

class ServiceUnavailableException extends Error {
  code = "SERVICE_UNAVAILABLE";
  status = 503;
  constructor(message?: string) {
    super(
      message ??
        "The server is currently unavailable (because it is overloaded or down for maintenance)."
    );
    this.name = "SERVICE_UNAVAILABLE";
  }
}

class UnauthorizedException extends Error {
  code = "UNAUTHORIZED";
  status = 401;
  constructor(message?: string) {
    super(message ?? "You are not authorized to access this resource.");
    this.name = "UNAUTHORIZED";
  }
}

export {
  BadGatewayException,
  BadRequestException,
  ConflictException,
  ForbiddenException,
  ImATeapotException,
  InternalServerErrorException,
  MethodNotAllowedException,
  NotFoundException,
  NotImplementedException,
  ServiceUnavailableException,
  UnauthorizedException,
};
