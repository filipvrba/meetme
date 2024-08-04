export default async function handler(req, res) {
  const { method } = req;
  const { URL_API, BEF_CLIENT, BEF_SERVER, DATABASE } = process.env;

  // Funkce pro zpracování GET požadavků
  async function handleGet(query) {
    try {
      const response = await fetch(`${URL_API}?token=${BEF_CLIENT}&database=${DATABASE}&query=${encodeURIComponent(query)}`);
      const data = await response.json();
      res.status(200).json(data);
    } catch (error) {
      console.error('GET error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }

  // Funkce pro zpracování POST, DELETE, PATCH požadavků
  async function handleRequest(method, query) {
    console.log(method, query);

    try {
      const response = await fetch(URL_API, {
        method,
        headers: {
          'Token': BEF_SERVER,
          'Database': DATABASE,
          'Query': query
        }
      });
      const data = await response.json();
      if (response.ok) {
        res.status(200).json(data);
      } else {
        res.status(response.status).json(data);
      }
    } catch (error) {
      console.error('Request error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  }

  // Zpracování různých metod
  switch (method) {
    case 'GET':
      return handleGet(req.query.query);
    case 'POST':
    case 'DELETE':
    case 'PATCH':
      return handleRequest(method, req.query.query);
    default:
      res.setHeader('Allow', ['GET', 'POST', 'DELETE', 'PATCH']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
