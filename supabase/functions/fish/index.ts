import { serve } from "https://deno.land/std@0.181.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Initialize Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

serve(async (req: Request) => {
  // Simple content-type header for JSON responses
  const headers = { "Content-Type": "application/json" };

  try {
    // Handle GET request - fetch fish data
    if (req.method === "GET") {
      console.log("Received GET request"); // Debugging log
      const { data, error } = await supabase
        .from("fish")
        .select("*")
        .order("Name", { ascending: true });

      if (error) {
        console.error("Error fetching fish data:", error); // Log errors to debug issues
        throw error;
      }

      console.log("Fetched fish data successfully:", data); // Log successful response
      return new Response(JSON.stringify(data), { headers });
    }

    // Handle POST request - add new fish entry
    if (req.method === "POST") {
      console.log("Received POST request"); // Debugging log
      
      // Read request body
      const { Name, Sell, Shadow, Where } = await req.json();
      console.log("POST request body:", { Name, Sell, Shadow, Where }); // Log request data

      // Validate input
      if (!Name || !Sell || !Shadow || !Where) {
        console.warn("POST request missing required fields"); // Log warning for debugging
        return new Response(
          JSON.stringify({ error: "All fields are required." }),
          { status: 400, headers }
        );
      }

      // Insert new fish into database
      const { error } = await supabase
        .from("fish")
        .insert([{ Name, Sell, Shadow, Where }]);

      if (error) {
        console.error("Error inserting fish:", error); // Log errors for debugging
        throw error;
      }

      console.log("Fish added successfully"); // Log success message
      return new Response(
        JSON.stringify({ success: true, message: "Fish added successfully!" }),
        { headers }
      );
    }

    // Handle PUT request - update existing fish entry
    if (req.method === "PUT") {
      console.log("Received PUT request"); // Debugging log
      
      // Read request body
      const { Id, Name, Sell, Shadow, Where } = await req.json();
      console.log("PUT request body:", { Id, Name, Sell, Shadow, Where }); // Log request data

      // Validate input
      if (!Id || !Name || !Sell || !Shadow || !Where) {
        console.warn("PUT request missing required fields"); // Log warning
        return new Response(
          JSON.stringify({ error: "All fields are required." }),
          { status: 400, headers }
        );
      }
    
      // Update fish record in database
      const { error } = await supabase
        .from("fish")
        .update({ Name, Sell, Shadow, Where })
        .eq("Id", Id);

      if (error) {
        console.error("Error updating fish:", error); // Log errors
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers,
        });
      }

      console.log("Fish updated successfully"); // Log success message
      return new Response(
        JSON.stringify({ success: true, message: "Fish updated successfully!" }),
        { headers }
      );
    }
    
    // Handle DELETE request - remove fish entry
    if (req.method === "DELETE") {
      console.log("Received DELETE request"); // Debugging log
      
      // Read request body
      const { Id } = await req.json();
      console.log("DELETE request body:", { Id }); // Log request data

      // Validate input
      if (!Id) {
        console.warn("DELETE request missing required fields"); // Log warning
        return new Response(
          JSON.stringify({ error: "All fields are required." }),
          { status: 400, headers }
        );
      }
    
      // Delete fish record from database
      const { error } = await supabase
        .from("fish")
        .delete()
        .eq("Id", Id);

      if (error) {
        console.error("Error deleting fish:", error); // Log errors
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers,
        });
      }

      console.log("Fish deleted successfully"); // Log success message
      return new Response(
        JSON.stringify({ success: true, message: "Fish deleted successfully!" }),
        { headers }
      );
    }

    // Handle unsupported methods
    console.warn(`Unsupported HTTP method: ${req.method}`); // Log unsupported method
    return new Response(JSON.stringify({ error: "Method not allowed" }), { 
      status: 405, 
      headers 
    });
    
  } catch (error) {
    console.error("Server error:", error); // Log server-side errors
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), { 
      status: 500, 
      headers 
    });
  }
});

