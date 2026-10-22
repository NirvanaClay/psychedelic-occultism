const express = require('express');
const router = express.Router();
const Web = require('../models/Web');
const protect = require('../middleware/authMiddleware')

// ✅ GET: Retrieve all webs
router.get('/', protect, async (req, res) => {
  try {
    const webs = await Web.find({
      createdBy: req.user.userId,
    }).populate('createdBy', 'username');

    res.json(webs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ GET: Retrieve a specific web by ID
router.get('/:id', async (req, res) => {
  try {
    const web = await Web.findById(req.params.id)
      .populate('createdBy', 'username')
      .populate('nodes.refId')
      .exec();
    
    if (!web) return res.status(404).json({ error: "Web not found" });

    res.json(web);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ✅ POST: Create a new web
router.post('/', protect, async (req, res) => {
  try {
    const { title, description, nodes } = req.body;

    if (!title) {
      return res.status(400).json({ error: "Title is required" });
    }

    const normalizedTitle = title.trim().toLowerCase();

    const newWeb = new Web({
      title: title.trim(),
      normalizedTitle,
      description,
      createdBy: req.user.userId,
      nodes: nodes || [],
    });

    // const newWeb = new Web({
    //   title,
    //   description,
    //   createdBy: req.user.userId,
    //   nodes: nodes || [],
    // });

    await newWeb.save();

    res.status(201).json(newWeb);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// router.post('/', protect, async (req, res) => {
//   try {
//     const { title, description, createdBy, nodes } = req.body;

//     if (!title || !createdBy) {
//       return res.status(400).json({ error: "Title and CreatedBy are required" });
//     }

//     // const newWeb = new Web({ title, description, createdBy, nodes });
//     const newWeb = new Web({
//       title,
//       description,
//       createdBy: req.user.id,
//       nodes,
//     });
//     await newWeb.save();
    
//     res.status(201).json(newWeb);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

router.put('/:id', protect, async (req, res) => {
  try {
    const { refModel, refId } = req.body;

    // Validate input
    if (!refModel || !refId) {
      return res.status(400).json({ 
        error: "Please provide both refModel and refId",
        code: "MISSING_DATA" 
      });
    }

    // Check if web exists
    const existingWeb = await Web.findById(req.params.id);
    if (!existingWeb) {
      return res.status(404).json({ 
        error: "Web not found",
        code: "WEB_NOT_FOUND" 
      });
    }

    // Check for duplicates
    const isDuplicate = existingWeb.nodes.some(
      node => node.refModel === refModel && node.refId.toString() === refId
    );
    if (isDuplicate) {
      return res.status(400).json({ 
        error: "This item already exists in the web",
        code: "DUPLICATE_NODE" 
      });
    }

    // Update the web
    const updatedWeb = await Web.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { nodes: { refModel, refId } } },
      { new: true }
    );

    res.json({ 
      success: true, 
      updatedWeb,
      message: "Node added successfully"
    });

  } catch (err) {
    // Handle specific MongoDB errors
    if (err.name === 'CastError') {
      return res.status(400).json({ 
        error: "Invalid web ID format",
        code: "INVALID_ID" 
      });
    }

    console.error("🔥 Server error:", err.message);
    res.status(500).json({ 
      error: "Internal server error occurred",
      code: "SERVER_ERROR" 
    });
  }
});

// ✅ DELETE: Delete a web
router.delete('/:id', protect, async (req, res) => {
  try {
    const deletedWeb = await Web.findByIdAndDelete(req.params.id);
    if (!deletedWeb) return res.status(404).json({ error: "Web not found" });

    res.json({ message: "Web deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
