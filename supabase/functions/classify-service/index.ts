import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ServiceCategory {
  id: string;
  name: string;
  services: Array<{
    id: string;
    name: string;
  }>;
}

const serviceCategories: ServiceCategory[] = [
  {
    id: "home-cleaning",
    name: "Home Cleaning",
    services: [
      { id: "deep-cleaning", name: "Deep Cleaning" },
      { id: "regular-cleaning", name: "Regular Cleaning" },
      { id: "window-cleaning", name: "Window Cleaning" },
      { id: "carpet-cleaning", name: "Carpet Cleaning" },
      { id: "move-in-out", name: "Move-in/Move-out" },
      { id: "office-cleaning", name: "Office Cleaning" }
    ]
  },
  {
    id: "home-renovation",
    name: "Home Renovation",
    services: [
      { id: "kitchen-renovation", name: "Kitchen Renovation" },
      { id: "bathroom-renovation", name: "Bathroom Renovation" },
      { id: "flooring", name: "Flooring" },
      { id: "painting", name: "Painting" },
      { id: "roofing", name: "Roofing" },
      { id: "electrical-work", name: "Electrical Work" }
    ]
  },
  {
    id: "plumbing-services",
    name: "Plumbing Services",
    services: [
      { id: "pipe-repair", name: "Pipe Repair" },
      { id: "drain-cleaning", name: "Drain Cleaning" },
      { id: "faucet-installation", name: "Faucet Installation" },
      { id: "toilet-repair", name: "Toilet Repair" },
      { id: "water-heater", name: "Water Heater" },
      { id: "emergency-plumbing", name: "Emergency Plumbing" }
    ]
  },
  {
    id: "electrical-services",
    name: "Electrical Services",
    services: [
      { id: "outlet-installation", name: "Outlet Installation" },
      { id: "light-fixture", name: "Light Fixture" },
      { id: "circuit-breaker", name: "Circuit Breaker" },
      { id: "wiring", name: "Wiring" },
      { id: "smart-home", name: "Smart Home" },
      { id: "electrical-inspection", name: "Electrical Inspection" }
    ]
  },
  {
    id: "garden-outdoor",
    name: "Garden & Outdoor",
    services: [
      { id: "lawn-care", name: "Lawn Care" },
      { id: "tree-trimming", name: "Tree Trimming" },
      { id: "garden-design", name: "Garden Design" },
      { id: "fence-installation", name: "Fence Installation" },
      { id: "deck-building", name: "Deck Building" },
      { id: "outdoor-lighting", name: "Outdoor Lighting" }
    ]
  },
  {
    id: "moving-services",
    name: "Moving Services",
    services: [
      { id: "local-moving", name: "Local Moving" },
      { id: "long-distance", name: "Long Distance" },
      { id: "packing-services", name: "Packing Services" },
      { id: "storage", name: "Storage" },
      { id: "furniture-assembly", name: "Furniture Assembly" },
      { id: "moving-supplies", name: "Moving Supplies" }
    ]
  }
];

function classifyService(userInput: string): {
  serviceId: string;
  categoryId: string;
  serviceName: string;
  categoryName: string;
  confidence: number;
} {
  const input = userInput.toLowerCase();
  
  const keywords = {
    "home-cleaning": ["clean", "cleaning", "dust", "vacuum", "mop", "tidy", "sanitize", "disinfect", "carpet", "window", "office clean", "move out", "move in"],
    "deep-cleaning": ["deep clean", "thorough", "spring clean", "detailed clean"],
    "regular-cleaning": ["regular clean", "weekly", "monthly", "maintenance clean", "routine"],
    "window-cleaning": ["window", "glass", "windows"],
    "carpet-cleaning": ["carpet", "rug", "upholstery"],
    "move-in-out": ["move in", "move out", "moving clean", "end of lease"],
    "office-cleaning": ["office", "commercial", "workplace"],
    
    "home-renovation": ["renovation", "remodel", "upgrade", "renovate", "redo", "makeover"],
    "kitchen-renovation": ["kitchen", "countertop", "cabinet", "kitchen remodel"],
    "bathroom-renovation": ["bathroom", "shower", "bath", "tile", "bathroom remodel"],
    "flooring": ["floor", "flooring", "hardwood", "laminate", "tile floor", "vinyl"],
    "painting": ["paint", "painting", "repaint", "wall color"],
    "roofing": ["roof", "roofing", "shingle", "gutter"],
    "electrical-work": ["electric", "electrical", "wire", "wiring", "outlet", "light", "power"],
    
    "plumbing-services": ["plumb", "plumbing", "pipe", "leak", "drain", "water", "faucet", "toilet", "sink"],
    "pipe-repair": ["pipe", "leak", "burst pipe", "broken pipe"],
    "drain-cleaning": ["drain", "clog", "blocked", "slow drain"],
    "faucet-installation": ["faucet", "tap", "install faucet"],
    "toilet-repair": ["toilet", "flush", "running toilet"],
    "water-heater": ["water heater", "hot water", "heater"],
    "emergency-plumbing": ["emergency", "urgent", "burst", "flooding"],
    
    "electrical-services": ["electric", "electrical", "wire", "wiring", "outlet", "switch", "breaker"],
    "outlet-installation": ["outlet", "socket", "plug", "install outlet"],
    "light-fixture": ["light", "lighting", "fixture", "chandelier", "lamp"],
    "circuit-breaker": ["breaker", "circuit", "fuse", "trip"],
    "wiring": ["wire", "wiring", "rewire"],
    "smart-home": ["smart home", "automation", "smart", "thermostat"],
    "electrical-inspection": ["inspect", "inspection", "safety check"],
    
    "garden-outdoor": ["garden", "yard", "lawn", "outdoor", "landscape", "tree", "grass", "fence", "deck"],
    "lawn-care": ["lawn", "grass", "mow", "mowing"],
    "tree-trimming": ["tree", "trim", "prune", "branch"],
    "garden-design": ["garden design", "landscape", "landscaping", "planting"],
    "fence-installation": ["fence", "fencing", "install fence"],
    "deck-building": ["deck", "patio", "build deck"],
    "outdoor-lighting": ["outdoor light", "garden light", "exterior light"],
    
    "moving-services": ["move", "moving", "relocat", "transport", "pack", "unpack", "furniture"],
    "local-moving": ["local move", "nearby", "same city"],
    "long-distance": ["long distance", "far", "interstate", "cross country"],
    "packing-services": ["pack", "packing", "box"],
    "storage": ["storage", "store", "warehouse"],
    "furniture-assembly": ["furniture", "assemble", "assembly", "ikea"],
    "moving-supplies": ["supplies", "boxes", "tape", "bubble wrap"]
  };
  
  let bestMatch = { serviceId: "", categoryId: "", score: 0, serviceName: "", categoryName: "" };
  
  for (const category of serviceCategories) {
    const categoryKeywords = keywords[category.id] || [];
    let categoryScore = 0;
    
    for (const keyword of categoryKeywords) {
      if (input.includes(keyword)) {
        categoryScore += 2;
      }
    }
    
    for (const service of category.services) {
      const serviceKeywords = keywords[service.id] || [];
      let serviceScore = categoryScore;
      
      for (const keyword of serviceKeywords) {
        if (input.includes(keyword)) {
          serviceScore += 5;
        }
      }
      
      if (input.includes(service.name.toLowerCase())) {
        serviceScore += 10;
      }
      
      if (serviceScore > bestMatch.score) {
        bestMatch = {
          serviceId: service.id,
          categoryId: category.id,
          score: serviceScore,
          serviceName: service.name,
          categoryName: category.name
        };
      }
    }
  }
  
  if (bestMatch.score === 0) {
    bestMatch = {
      serviceId: "regular-cleaning",
      categoryId: "home-cleaning",
      score: 1,
      serviceName: "Regular Cleaning",
      categoryName: "Home Cleaning"
    };
  }
  
  const confidence = Math.min(bestMatch.score / 20, 1.0);
  
  return {
    serviceId: bestMatch.serviceId,
    categoryId: bestMatch.categoryId,
    serviceName: bestMatch.serviceName,
    categoryName: bestMatch.categoryName,
    confidence
  };
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { userInput, sessionId } = await req.json();

    if (!userInput || typeof userInput !== "string" || userInput.trim() === "") {
      return new Response(
        JSON.stringify({ error: "userInput is required and must be a non-empty string" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    const classification = classifyService(userInput);

    const { data: request, error: insertError } = await supabase
      .from("ai_classification_requests")
      .insert({
        user_input: userInput,
        classified_service_id: classification.serviceId,
        classified_category_id: classification.categoryId,
        confidence_score: classification.confidence,
        session_id: sessionId || null,
        metadata: {
          user_agent: req.headers.get("user-agent"),
          timestamp: new Date().toISOString()
        }
      })
      .select()
      .single();

    if (insertError) {
      console.error("Error inserting classification:", insertError);
      return new Response(
        JSON.stringify({ error: "Failed to log classification" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(
      JSON.stringify({
        requestId: request.id,
        classification: {
          serviceId: classification.serviceId,
          categoryId: classification.categoryId,
          serviceName: classification.serviceName,
          categoryName: classification.categoryName,
          confidence: classification.confidence
        }
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error in classify-service:", error);
    return new Response(
      JSON.stringify({ error: "Internal server error", details: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});