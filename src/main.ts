import express, {NextFunction, Request, Response} from "express";
import { fsService } from "./fs.service";
import {ApiError} from "./errors/api-error";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await fsService.read();
    res.json(users);
  } catch (e) {
    res.status(500).json(e.message);
  }
});

app.post("/users", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;
    if (!name || name.length < 3) {
     throw new ApiError(
         "Name is required and should be at least 3 characters",
         400
     )
    }
    if (!email || !email.includes("@")) {
      return res.status(400).json("Email is required and should be valid");
    }
    if (!password || password.length < 6) {
        throw new ApiError(
            "Password is requaired and should be at least 6 characters",
            400
        )
    }

    const users = await fsService.read();
    const index = users.findIndex((user) => user.email === email);
    if (index !== -1) {
      throw new ApiError(
          "User with this email already exists",
          409
          )
    }

    const newUser = {
      id: users[users.length - 1].id + 1,
      name,
      email,
      password,
    };
    users.push(newUser);
    await fsService.write(users);

    res.status(201).json(newUser);
  } catch (e) {
    next(e)
  }
});

app.get("/users/:userId", async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);

    const users = await fsService.read();
    const user = users.find((user) => user.id === userId);
    if (!user) {
      return res.status(404).json("User not found");
    }
    res.json(user);
  } catch (e) {
    res.status(500).json(e.message);
  }
});

app.put("/users/:userId", async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    const { name, email, password } = req.body;

    const users = await fsService.read();
    const user = users.find((user) => user.id === userId);
    if (!user) {
      return res.status(404).json("User not found");
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (password) user.password = password;

    await fsService.write(users);

    res.status(201).json(user);
  } catch (e) {
    res.status(500).json(e.message);
  }
});

app.delete("/users/:userId", async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);

    const users = await fsService.read();
    const index = users.findIndex((user) => user.id === userId);
    if (index === -1) {
      return res.status(404).json("User not found");
    }
    users.splice(index, 1);
    await fsService.write(users);

    res.sendStatus(204);
  } catch (e) {
    res.status(500).json(e.message);
  }
});



app.use(
    "*",
    (err: ApiError, req: Request, res: Response, next: NextFunction) => {
      res.status(err.status || 500).json(err.message);
    },
);

process.on("uncaughtException", (e) => {
  console.error("uncaughtException", e.message, e.stack);
  process.exit(1);
});


app.listen(3000, () => {
  console.log("Server is runing on port 3000!");
});
