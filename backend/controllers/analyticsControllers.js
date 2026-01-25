export const createCityLog = async (req, res) => {
  try {
    const { city } = req.body;

    const collection = req.db.collection("weatherCityLog");

    const at = new Date();
    const doc = { city, at };

    const result = await collection.insertOne(doc);

    console.log(`city="${city}" at=${at.toISOString()}`);

    return res.status(201).json({
      success: true,
      message: "Selected city logged successfully.",
      data: {
        id: result.insertedId,
        city,
        at: at.toISOString(),
      },
    });
  } catch (error) {
    console.error("City log error:", error);
    return res.status(500).json({
      error: true,
      message: "Server error.",
    });
  }
};
