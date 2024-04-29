export interface AgentResponse {
  status: number;
  data: Agent[];
}

export interface Agent {
  uuid: string;
  displayName: string;
  description: string;
  developerName: string;
  // characterTags: null,
  displayIcon: string;
  displayIconSmall: string;
  bustPortrait: string;
  fullPortrait: string;
  fullPortraitV2: string;
  killfeedPortrait: string;
  background: string;
  backgroundGradientColors: string[];
  assetPath: string;
  isFullPortraitRightFacing: boolean;
  isPlayableCharacter: boolean;
  isAvailableForTest: boolean;
  isBaseContent: boolean;
  role: AgentRole;
  recruitmentData: null;
  abilities: AgentAbility[];
  // voiceLine: null
}

export interface AgentRole {
  uuid: string;
  displayName: string;
  description: string;
  displayIcon: string;
  assetPath: string;
}

export interface AgentAbility {
  slot: string;
  displayName: string;
  description: string;
  displayIcon: string;
}
