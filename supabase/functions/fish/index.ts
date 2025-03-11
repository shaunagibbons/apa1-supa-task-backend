import { serve } from "https://deno.land/std@0.181.0/http/server.ts";

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Initialize Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
const supabaseServiceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

serve(async (req: Request) => {
  // Simple content-type header is all we need
  const headers = { "Content-Type": "application/json" };

  try {
    // Handle GET request - fetch messages
    if (req.method === "GET") {
      const { data, error } = await supabase
        .from("fish")
        .select("*")
        .order("Name", { ascending: true });

      if (error) {
        console.log(error);
        throw error;
      }
      return new Response(JSON.stringify(data), { headers });
    }

    // Handle POST request - add message
    if (req.method === "POST") {
      // Read request body
      const { Name, Sell, Shadow, Where } = await req.json();

      // Validate input
      if (!Name || !Sell || !Shadow || !Where) {
        return new Response(
          JSON.stringify({ error: "All fields are required." }),
          { status: 400, headers }
        );
      }
      const { error } = await supabase
        .from("fish")
        .insert([{ Name, Sell, Shadow, Where }]);

      if (error) {
        console.error("Error inserting fish:", error);
        throw error;
      }

      return new Response(
        JSON.stringify({ success: true, message: "Fish added successfully!" }),
        { headers }
      );
    }

    if (req.method === "PUT") {
      // Read request body
      const { Id, Name, Sell, Shadow, Where } = await req.json();

      // Validate input
      if (!Id || !Name || !Sell || !Shadow || !Where) {
        return new Response(
          JSON.stringify({ error: "All fields are required." }),
          { status: 400, headers }
        );
      }
    
      // Update fish where Name matches
      const { error } = await supabase
        .from("fish")
        .update({ Name, Sell, Shadow, Where }) // Fields to update
        .eq("Id", Id); // Find fish by Name
    
      if (error) {
        console.error("Error updating fish:", error);
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers,
        });
      }
    
      return new Response(
        JSON.stringify({ success: true, message: "Fish updated successfully!" }),
        { headers }
      );
    }
    
    if (req.method === "DELETE") {
      // Read request body
      const { Id } = await req.json();

      // Validate input
      if (!Id) {
        return new Response(
          JSON.stringify({ error: "All fields are required." }),
          { status: 400, headers }
        );
      }
    
      const { error } = await supabase
      .from('fish')
      .delete()
      .eq('Id', Id)

      if (error) {
        console.error("Error deleting fish:", error);
        return new Response(JSON.stringify({ error: error.message }), {
          status: 500,
          headers,
        });
      }
    
      return new Response(
        JSON.stringify({ success: true, message: "Fish deleted successfully!" }),
        { headers }
      );
    }

    // Handle unsupported methods
    return new Response(JSON.stringify({ error: "Method not allowed" }), { 
      status: 405, 
      headers 
    });
    
  } catch (error) {
    const errorMessage = error instanceof Error ? error.fish : "Unknown error";
    return new Response(JSON.stringify({ error: errorMessage }), { 
      status: 500, 
      headers 
    });
  }
});
