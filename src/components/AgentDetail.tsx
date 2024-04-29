import { Agent, AgentAbility } from "@/types/agent";
import { Fragment, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  selectedAgent?: Agent | null;
};

const AgentDetail = ({ selectedAgent }: Props) => {
  const [selectedAbility, setSelectedAbility] = useState<AgentAbility | null>(
    null
  );

  return (
    <>
      <div className="row justify-start p-4 gap-4">
        {selectedAgent && (
          <img
            className="h-[80px] p-2"
            src={selectedAgent?.role.displayIcon}
            alt={selectedAgent?.role.displayName}
          />
        )}
        <h1 className="family-teko font-bold uppercase text-white text-8xl tracking-wide -mb-4">
          {selectedAgent ? (
            selectedAgent.displayName
          ) : (
            <div className="mr-2">???</div>
          )}
        </h1>
      </div>
      <div className="col p-4 h-full"></div>

      {selectedAgent && (
        <>
          <AnimatePresence>
            {selectedAbility && (
              <motion.div
                layout
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ ease: [0, 0, 0, 1] }}
                className="col p-4 bg-[#0F1922] bg-opacity-25 text-white"
              >
                <h2 className="family-athiti text-2xl uppercase font-semibold">
                  {selectedAbility.displayName}
                </h2>
                <p className="family-athiti font-thin">
                  {selectedAbility.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
          <motion.div
            layout
            transition={{ ease: [0, 0, 0, 1] }}
            className="row bg-[#0F1922] bg-opacity-25 backdrop-blur-sm border-t border-white border-opacity-10"
          >
            {selectedAgent.abilities
              .map((ability, index) => (
                <Fragment key={index}>
                  <div
                    onPointerEnter={() => {
                      setSelectedAbility(ability);
                    }}
                    onPointerLeave={() => {
                      setSelectedAbility(null);
                    }}
                    className="col items-center p-4 gap-4 flex-1 hover:bg-white hover:bg-opacity-10"
                  >
                    <motion.img
                      layout
                      transition={{ ease: [0, 0, 0, 1] }}
                      className="h-[80px] p-2 object-contain"
                      src={ability.displayIcon}
                      alt={ability.displayName}
                    />
                    {selectedAbility && (
                      <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ ease: [0, 0, 0, 1] }}
                        className="family-athiti text-white uppercase text-center"
                      >
                        {ability.displayName}
                      </motion.p>
                    )}
                  </div>
                </Fragment>
              ))
              .slice(0, 4)}
          </motion.div>
        </>
      )}
    </>
  );
};

export default AgentDetail;
