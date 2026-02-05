import z from "zod";

export const authScheme = z.object({
  email: z
    .email({
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      error: (issue) => {
        if (issue.input === undefined) {
          return "This field is required";
        }
        return "Invalid email format";
      },
    })
    .trim(),
  password: z
    .string({
      error: (issue) => {
        if (issue.input === undefined) return "This field is required";
      },
    })
    .trim()
    .min(6, "Too short password")
    .max(20, "Too long password"),
  login: z
    .string({
      error: (issue) => {
        if (issue.input === undefined) return "This field is required";
      },
    })
    .trim()
    .min(6, "Too short login")
    .max(20, "Too long login"),
  firstName: z
    .string({
      error: (issue) => {
        if (issue.input === undefined) return "This field is required";
      },
    })
    .trim()
    .min(2, "Too short firstName")
    .max(20, "Too long firstName"),
  lastName: z
    .string({
      error: (issue) => {
        if (issue.input === undefined) return "This field is required";
      },
    })
    .trim()
    .min(2, "Too short lastName")
    .max(20, "Too long lastName"),
});

export type FormState =
  | {
      errors?: {
        firstName?: string[];
        lastName?: string[];
        login?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
    }
  | undefined;
