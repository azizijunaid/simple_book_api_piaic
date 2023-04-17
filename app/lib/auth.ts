export async function verifyAuth(token: string, host: string) {
  try {
    const response = await fetch(`http://${host}/api/users`, {
      method: "POST",
      body: JSON.stringify({ token }),
    });

    const decodedUser = await response.json();

    return decodedUser;
  } catch (error) {
    console.log(error);
    throw new Error("Something went wrong");
  }
}
