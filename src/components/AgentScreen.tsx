import { Agent } from "@/types/agent";
import { AnimatePresence, motion } from "framer-motion";
import AgentDetail from "./AgentDetail";
import valorantLogo from "@/assets/valorant.svg";
import { Map } from "@/types/map";

type Props = {
  selectedAgent: Agent | null;
  map: Map;
};

const AgentScreen = ({ selectedAgent, map }: Props) => {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ ease: [0, 0, 0, 1] }}
        style={{
          clipPath:
            "polygon(calc(0% + 32px) 0%, calc(100% - 32px) 0%, 100% calc(0% + 32px), 100% calc(100% - 32px), calc(100% - 32px) 100%, calc(0% + 32px) 100%, 0% calc(100% - 32px), 0% calc(0% + 32px))",
        }}
        className="row h-full"
      >
        {selectedAgent ? (
          <>
            <motion.div
              key={map.displayName}
              className="relative"
              initial={{
                width: "50%",
                opacity: 0,
              }}
              animate={{ width: "60%", opacity: 1 }}
              whileHover={{ width: "100%" }}
              transition={{ ease: [0, 0, 0, 1] }}
            >
              <div className="absolute w-full h-full top-0 left-0 z-40 col">
                <AgentDetail selectedAgent={selectedAgent} />
              </div>
              <div className="absolute w-full h-full top-0 left-0 z-30 col overflow-hidden">
                <div className="absolute w-full h-full scale-[2] top-[90%] left-[50%] -translate-x-1/2 -translate-y-1/2">
                  {selectedAgent && (
                    <img
                      className="absolute h-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 object-cover -scale-x-[1]"
                      src={selectedAgent.fullPortraitV2}
                      alt={selectedAgent.displayName}
                    />
                  )}
                </div>
              </div>
              <div
                className={`absolute w-full h-[75%] bottom-0 left-0 z-30 bg-gradient-to-t from-[#0F1922] to-transparent opacity-75`}
              />
              <div
                className={`absolute w-full h-full top-0 left-0 z-20 bg-gradient-to-t from-[#0F1922] to-transparent opacity-75`}
              />
              <div
                style={{
                  background: `#${selectedAgent?.backgroundGradientColors[0]}`,
                }}
                className="absolute w-full h-full top-0 left-0 z-10 mix-blend-multiply"
              />
              <img
                className="absolute w-full h-full top-0 left-0 object-cover"
                src={map.splash}
                alt={map.displayName}
              />
            </motion.div>
            {/*  */}
            <div
              style={{
                background: `#${
                  selectedAgent
                    ? selectedAgent.backgroundGradientColors[0]
                    : "FF4654"
                }`,
              }}
              className="relative flex-1 h-full overflow-hidden"
            >
              {selectedAgent && (
                <AnimatePresence key={selectedAgent?.displayName}>
                  <>
                    <div className="absolute top-0 left-0 w-full h-full row justify-center items-center z-20">
                      <motion.img
                        initial={{ x: -64 }}
                        animate={{ x: 0 }}
                        transition={{ ease: [0, 0, 0, 1] }}
                        className="object-cover h-full py-8"
                        src={selectedAgent.fullPortraitV2}
                        alt={selectedAgent.displayName}
                      />
                    </div>
                    <div className="absolute top-0 left-0 w-full h-full row justify-center items-center z-10">
                      <img
                        style={{
                          maskImage:
                            "linear-gradient(180deg , black, transparent)",
                        }}
                        className="object-cover h-full"
                        src={selectedAgent.background}
                        alt={`${selectedAgent.displayName} Background`}
                      />
                    </div>
                  </>
                </AnimatePresence>
              )}
            </div>
          </>
        ) : (
          <div className="w-full h-full bg-[#FF4654] col justify-center items-center">
            <img className="w-48" src={valorantLogo} alt="Valorant Logo" />
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default AgentScreen;
