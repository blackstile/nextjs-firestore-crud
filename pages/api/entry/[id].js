import db from '../../../utils/db';

export default async function routeActions(req, res) {
  const { method } = req;
  console.log('method: ====================', method);
  try {
    switch (method?.toUpperCase()) {
      case 'PUT':
        await updateEntry(req, res);
        break;
      case 'DELETE':
        await deleteEntry(req, res);
        break;
      default:
        await getEntry(req, res);
    }
  } catch (err) {
    console.log(err);
    res.status(400).end();
  }
}
const getEntry = async (req, res) => {
  const { id } = req.query;
  const entry = await db.collection('entries').doc(id).get();
  if (!entry.exists) {
    res.status(404).end();
  }
  res.status(200).json({ post: entry.data() });
};

const deleteEntry = async (req, res) => {
  const { id } = req.query;
  await db.collection('entries').doc(id).delete();
  res.status(200).end();
};

const updateEntry = async (req, res) => {
  const { id } = req.query;
  await db
    .collection('entries')
    .doc(id)
    .update({
      ...req.body,
      updated: new Date().toISOString(),
    });
  res.status(200).end();
};
