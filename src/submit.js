import { useStore } from "./store";
import axios from "axios";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Background } from "reactflow";

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
        "https://vector-shift-backend.vercel.app/pipelines/parse",
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
      <button
        type="submit"
        onClick={handleSubmit}
        style={{
          backgroundColor: "rgb(123, 143, 255)", // Green background
          color: "white", // White text
          padding: "10px 20px", // Padding
          border: "none", // No border
          borderRadius: "5px", // Rounded corners
          cursor: "pointer", // Pointer cursor
          fontSize: "16px", // Font size
          transition: "background-color 0.3s", // Smooth transition on hover
          outline: "none",
        }} //
        onMouseOver={(e) =>
          (e.target.style.backgroundColor = "rgb(110, 123, 255)")
        }
        onMouseOut={(e) =>
          (e.target.style.backgroundColor = "rgb(123, 143, 255)")
        }
      >
        Submit
      </button>
    </div>
  );
};
