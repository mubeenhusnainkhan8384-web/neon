import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { productName } = await request.json();

    console.log("GROQ_API_KEY exists:", !!process.env.GROQ_API_KEY);

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json({ 
        error: "GROQ_API_KEY is missing in .env.local file" 
      }, { status: 500 });
    }

    // Mock response for now (to test if page works)
    return NextResponse.json({
      title: `${productName} - Premium Quality Version`,
      bullets: [
        "Made with high-quality materials",
        "Perfect for daily use",
        "Excellent customer reviews",
        "Fast shipping available",
        "Satisfaction guaranteed"
      ],
      description: `High-quality ${productName} designed to exceed your expectations. Perfect choice for smart Amazon sellers.`
    });

  } catch (error: any) {
    console.error("Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}