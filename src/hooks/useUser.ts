import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAPI from "./useAPI";
import { User } from "../types/user";

export default function useUser(id: string) {
  const [user, setUser] = useState<User | null>(null);
  const api = useAPI();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api<User>({
          url: `/user/${id}`,
        });

        setUser(data);
      } catch (error: any) {
        return navigate("/login");
      }
    })();
  }, [id]);

  return {
    user,
  };
}
