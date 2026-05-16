import { redirect } from "next/navigation";
import { isLoggedIn } from "../../../utils/auth";
import { PostForm } from "../../components/PostForm";

export default async function Page() {
  const loggedIn = await isLoggedIn();

    if (!loggedIn) {
    redirect("/");
  }

  return <PostForm />;
}