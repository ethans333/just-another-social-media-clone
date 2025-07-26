import Logo from "@/components/Logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link } from "react-router-dom";
import type { AuthRequest, AuthResponse } from "@/types/models";
import { noAuthApi } from "@/lib/api";
import type { AxiosError, AxiosResponse } from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = () => {
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const request: AuthRequest = {
      username,
      email,
      password,
    };

    noAuthApi
      .post("/register/", request)
      .then((response: AxiosResponse<AuthResponse>) => {
        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);
      })
      .catch((error: AxiosError) => {
        console.error("Registration failed", error.response?.data);
        setError(JSON.stringify(error.response?.data, null, 2));
      });
  };

  return (
    <div className="flex flex-col justify-center items-center h-[75vh] space-y-7">
      <Logo />
      <div className="flex flex-col items-center mt-4">
        <Input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-2 w-64"
        />
        <Input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="mb-2 w-64"
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-2 w-64"
        />
        <Input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="mb-4 w-64"
        />
        <Button className="w-64" onClick={handleRegister}>
          Register
        </Button>
      </div>
      <Link
        to="/login"
        className="text-sm text-foreground-muted hover:underline"
      >
        Already have an account? <div className="inline italic">Login</div>
      </Link>
      <p
        className={`text-sm text-destructive ${
          error ? "visible" : "invisible"
        }`}
      >
        {error || "XXX"}
      </p>
    </div>
  );
}
