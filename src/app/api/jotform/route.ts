import { NextRequest, NextResponse } from 'next/server';

const JOTFORM_API_KEY = process.env.NEXT_PUBLIC_JOTFORM_API_KEY;
const JOTFORM_API_BASE = 'https://api.jotform.com';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, data } = body;

    if (!JOTFORM_API_KEY) {
      return NextResponse.json(
        { error: 'JotForm API key not configured' },
        { status: 500 }
      );
    }

    switch (action) {
      case 'submit':
        // Enviar datos al formulario de JotForm
        const formId = '243557262332252'; // ID del formulario (reemplazar con el tuyo)
        const submitResponse = await fetch(
          `${JOTFORM_API_BASE}/form/${formId}/submissions?apiKey=${JOTFORM_API_KEY}`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              submission: data,
            }),
          }
        );

        const submitData = await submitResponse.json();
        return NextResponse.json(submitData);

      case 'getSubmissions':
        // Obtener últimas respuestas
        const formIdGet = '243557262332252'; // ID del formulario
        const getResponse = await fetch(
          `${JOTFORM_API_BASE}/form/${formIdGet}/submissions?apiKey=${JOTFORM_API_KEY}&limit=10&orderby=created_at`
        );

        const submissions = await getResponse.json();
        return NextResponse.json(submissions);

      case 'getForm':
        // Obtener información del formulario
        const formIdInfo = '243557262332252';
        const formResponse = await fetch(
          `${JOTFORM_API_BASE}/form/${formIdInfo}?apiKey=${JOTFORM_API_KEY}`
        );

        const formData = await formResponse.json();
        return NextResponse.json(formData);

      default:
        return NextResponse.json(
          { error: 'Invalid action' },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error('JotForm API Error:', error);
    return NextResponse.json(
      { error: 'Failed to process JotForm request', details: error },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    if (!JOTFORM_API_KEY) {
      return NextResponse.json(
        { error: 'JotForm API key not configured' },
        { status: 500 }
      );
    }

    // Obtener información del usuario
    const userResponse = await fetch(
      `${JOTFORM_API_BASE}/user?apiKey=${JOTFORM_API_KEY}`
    );

    const userData = await userResponse.json();
    
    // Obtener lista de formularios
    const formsResponse = await fetch(
      `${JOTFORM_API_BASE}/user/forms?apiKey=${JOTFORM_API_KEY}&limit=10`
    );

    const formsData = await formsResponse.json();

    return NextResponse.json({
      user: userData,
      forms: formsData,
      status: 'connected',
    });
  } catch (error) {
    console.error('JotForm API Error:', error);
    return NextResponse.json(
      { error: 'Failed to connect to JotForm', details: error },
      { status: 500 }
    );
  }
}
