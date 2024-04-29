import axios from "axios";

import { Agent, AgentResponse } from "@/types/agent";

import { motion } from "framer-motion";

import { useEffect, useState } from "react";
import { MapResponse } from "./types/map";

import { SlArrowUp } from "react-icons/sl";
import AgentScreen from "@/components/AgentScreen";

function App() {
  const [agents, setAgents] = useState<AgentResponse | null>(null);
  const [maps, setMaps] = useState<MapResponse | null>(null);
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);
  const [agentSelectorShow, setAgentSelectorShow] = useState<boolean>(false);
  const [mapIndex, setMapIndex] = useState<number>(0);

  const changeNextBackground = () => {
    if (maps) {
      mapIndex === maps.data.length - 1
        ? setMapIndex(0)
        : setMapIndex((prev) => prev + 1);
    }
  };

  const fetchAgentsAxios = async () => {
    const responseAgents: AgentResponse = (
      await axios.get("https://valorant-api.com/v1/agents")
    ).data;
    setAgents({
      ...responseAgents,
      data: responseAgents.data.filter(
        (agent) => agent.uuid !== "ded3520f-4264-bfed-162d-b080e2abccf9"
      ),
    });
  };
  const fetchMapsAxios = async () => {
    setMaps((await axios.get("https://valorant-api.com/v1/maps")).data);
  };

  useEffect(() => {
    fetchAgentsAxios();
    fetchMapsAxios();
  }, []);

  return agents && maps ? (
    <motion.div
      initial={{ background: "#0F1922" }}
      animate={{
        background: `#${
          selectedAgent ? selectedAgent.backgroundGradientColors[0] : "0F1922"
        }`,
      }}
      transition={{ ease: [0, 0, 0, 1] }}
      className="relative w-screen h-screen row justify-center overflow-hidden"
    >
      {selectedAgent && (
        <motion.img
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ ease: [0, 0, 0, 1] }}
          className="absolute w-[125%] h-[125%] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 mix-blend-multiply blur-sm"
          src={maps.data[mapIndex].splash}
          alt={`${maps.data[mapIndex].displayName} Background`}
        />
      )}
      <motion.div
        key={maps.data[mapIndex].uuid}
        initial={{ opacity: 1 }}
        animate={{ opacity: 0.75 }}
        transition={{ ease: [0, 0, 0, 1] }}
        className="absolute w-full h-full top-0 left-0 bg-[#0F1922]"
      />
      <div className="w-full h-full max-w-[1280px] col z-10">
        <AgentScreen selectedAgent={selectedAgent} map={maps.data[mapIndex]} />
        <div
          className="col m-16 mt-0"
          onPointerEnter={() => {
            setAgentSelectorShow(true);
          }}
          onPointerLeave={() => {
            setAgentSelectorShow(false);
          }}
        >
          <motion.div
            initial={{ opacity: 0.1 }}
            animate={{ opacity: agentSelectorShow ? 0.5 : 0.1 }}
            className="row justify-center py-8"
          >
            <SlArrowUp className="text-3xl text-white" />
          </motion.div>
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: agentSelectorShow ? "unset" : 0 }}
            transition={{ ease: [0, 0, 0, 1] }}
            className="row gap-1 overflow-hidden"
          >
            {agents
              ? agents.data.map((agent) => (
                  <div
                    onPointerEnter={() => {
                      setSelectedAgent(agent);
                      changeNextBackground();
                    }}
                    // onPointerLeave={() => {
                    //   setSelectedAgent(null);
                    //   changeNextBackground();
                    // }}
                    key={agent.uuid}
                    className="border border-white border-opacity-10 bg-white bg-opacity-10 hover:bg-opacity-25"
                  >
                    <img src={agent.displayIcon} alt={agent.displayName} />
                  </div>
                ))
              : "Empty"}
          </motion.div>
        </div>
      </div>
    </motion.div>
  ) : (
    <div className="relative w-screen h-screen row justify-center overflow-hidden bg-[#0F1922]" />
  );
}

export default App;
