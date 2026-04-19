import api from "./api";

export const guidelineService = {
  list: () => api.get("/guidelines"),
  upload: (formData) =>
    api.post("/guidelines/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }),
  reingest: (guidelineId) => api.post("/guidelines/ingest", { guidelineId }),
  remove: (id) => api.delete(`/guidelines/${id}`),
};
