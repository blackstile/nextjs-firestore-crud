import db from '../../../utils/db/';

const createEntry = async (req, res) => {
  try {
    const { slug } = req.body;
    const entries = await db.collection('entries').get();
    const entriesData = entries.docs.map((entry) => entry.data());

    if (entriesData.some((entry) => entry.slug === slug)) {
      res.status(400).end();
    } else {
      const { id } = await db.collection('entries').add({
        ...req.body,
        created: new Date().toISOString(),
      });
      res.status(200).json({ id });
    }
  } catch (error) {
    res.status(400).end();
  }
};
export default createEntry;
