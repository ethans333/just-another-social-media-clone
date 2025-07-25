import Logo from "@/components/Logo";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "@/lib/api";
import type { AuthResponse, LoginRequest } from "@/types/models";
import type { AxiosError, AxiosResponse } from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const navigate = useNavigate();

  const handleLogin = () => {
    const request: LoginRequest = {
      username,
      password,
    };

    api
      .post("/token/", request)
      .then((response: AxiosResponse<AuthResponse>) => {
        localStorage.setItem("accessToken", response.data.access);
        localStorage.setItem("refreshToken", response.data.refresh);
        navigate("/");
      })
      .catch((error: AxiosError) => {
        console.error("Login failed", error.response?.data);
        setError(JSON.stringify(error.response?.data, null, 2));
      });
  };

  return (
    <div className="flex flex-col justify-center items-center h-[75vh] space-y-7">
      <Logo />
      <div className="flex flex-col items-center mt-4">
        <Input
          type="text"
          placeholder="Email or Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="mb-2 w-64"
        />
        <Input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mb-4 w-64"
        />
        <Button className="w-64" onClick={handleLogin}>
          Login
        </Button>
      </div>
      <Link
        to="/register"
        className="text-sm text-foreground-muted hover:underline"
      >
        Don't have an account? <div className="inline italic">Register</div>
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
