export async function POST(req: Request) {
  try {
    // Parse the incoming JSON body from the request
    const { occupation, age, gender } = await req.json();

    // Log the received data
    console.log("Received user details:", { occupation });
    console.log("Received user details:", { age });
    console.log("Received user details:", { gender });

    // Respond with a success message
    return new Response(
      JSON.stringify({ message: "User details received successfully!" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error("Error processing user details:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
