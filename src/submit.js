import { useStore } from "./store";
import axios from "axios";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

export const SubmitButton = () => {
  const nodes = useStore((state) => state.nodes);
  const edges = useStore((state) => state.edges);

  const handleSubmit = async () => {
    try {
      const trimmedNodes = nodes.map((node) => node.id);
      const pipeline = JSON.stringify({ nodes: trimmedNodes, edges });

      const formData = new FormData();
      formData.append("pipeline", pipeline);

      const response = await axios.post(
        "http://127.0.0.1:8000/pipelines/parse",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      const { num_nodes, num_edges, is_dag } = response.data;

      toast(
        "num_nodes: " +
          num_nodes +
          ", num_edges: " +
          num_edges +
          ", is_dag: " +
          is_dag
      );
    } catch (error) {
      console.error("Error submitting pipeline data:", error);
      toast.error("Error occured");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </div>
  );
};
