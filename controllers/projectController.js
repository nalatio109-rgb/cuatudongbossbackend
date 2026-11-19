import Project from "../models/Project.js";

// Helper phân tích ngày thi công
const parseExecutionDate = (d) => {
  if (!d) return 0;
  const str = String(d).trim();
  const dmy = str.match(/^(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{4})$/);
  if (dmy) return new Date(parseInt(dmy[3], 10), parseInt(dmy[2], 10) - 1, parseInt(dmy[1], 10)).getTime();
  const my = str.match(/(?:tháng\s*|t\s*)?(\d{1,2})[\/\-\.](\d{4})/i);
  if (my) return new Date(parseInt(my[2], 10), parseInt(my[1], 10) - 1, 1).getTime();
  const y = str.match(/\b(19\d{2}|20\d{2})\b/);
  if (y) return new Date(parseInt(y[1], 10), 0, 1).getTime();
  const fallback = new Date(str);
  return isNaN(fallback.getTime()) ? 0 : fallback.getTime();
};

// GET /api/projects
export const getProjects = async (req, res) => {
  try {
    const { category } = req.query;
    let filter = {};
    if (category && category !== "all") {
      filter.category = category;
    }
    const projects = await Project.find(filter).sort({ updatedAt: -1, createdAt: -1 });
    const sorted = [...projects].sort((a, b) => {
      const tA = parseExecutionDate(a.completedDate);
      const tB = parseExecutionDate(b.completedDate);
      if (tA !== tB && (tA > 0 || tB > 0)) return tB - tA;
      const cA = new Date(a.createdAt || 0).getTime();
      const cB = new Date(b.createdAt || 0).getTime();
      return cB - cA;
    });
    res.status(200).json({ success: true, count: sorted.length, data: sorted });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/projects/:id
export const getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ success: false, message: "Không tìm thấy dự án" });
    }
    res.status(200).json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// POST /api/projects
export const createProject = async (req, res) => {
  try {
    const newProject = await Project.create(req.body);
    res.status(201).json({ success: true, data: newProject });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// PUT /api/projects/:id
export const updateProject = async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!updatedProject) {
      return res.status(404).json({ success: false, message: "Không tìm thấy dự án" });
    }
    res.status(200).json({ success: true, data: updatedProject });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// DELETE /api/projects/:id
export const deleteProject = async (req, res) => {
  try {
    const deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (!deletedProject) {
      return res.status(404).json({ success: false, message: "Không tìm thấy dự án" });
    }
    res.status(200).json({ success: true, message: "Đã xóa dự án thành công" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
