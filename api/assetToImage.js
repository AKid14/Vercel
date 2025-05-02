module.exports = async (req, res) => {
    const assetId = req.query.assetId;
    if (!assetId) return res.status(400).json({ error: "Missing assetId" });

    const imageUrl = `https://thumbnails.roblox.com/v1/assets?assetIds=${assetId}&format=Png&size=420x420`;

    try {
        const response = await fetch(imageUrl);
        const data = await response.json();

        if (!data || !data.data || !data.data[0] || !data.data[0].imageUrl) {
            return res.status(404).json({ error: "Thumbnail not found" });
        }

        res.status(200).json({
            assetId: assetId,
            imageUrl: data.data[0].imageUrl
        });
    } catch (err) {
        res.status(500).json({ error: "Failed to fetch image URL" });
    }
};
