exports.handler = async (event) => {
  const token = process.env.NOTION_TOKEN;
  const path = event.path.replace('/.netlify/functions/notion', '').replace('/api/notion', '');
  const notionUrl = `https://api.notion.com/v1${path}`;

  const headers = {
    'Authorization': `Bearer ${token}`,
    'Notion-Version': '2022-06-28',
    'Content-Type': 'application/json',
  };

  try {
    const response = await fetch(notionUrl, {
      method: event.httpMethod === 'GET' ? 'GET' : event.httpMethod,
      headers,
      body: event.body || undefined,
    });

    const data = await response.json();

    return {
      statusCode: response.status,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
