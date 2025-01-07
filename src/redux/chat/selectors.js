export const selectIsChatOpen = (state) => state.chat.isChatOpen;

export const selectChannels = (state) => state.chat.channels;

export const selectInbox = (state) => state.chat.inbox;

export const selectMessagesList = (state) => state.chat.messagesList;

export const selectChatMessages = (state) => state.chat.chatMessages;

export const selectUserInfo = (state) => state.chat.userInfo;

export const selectTags = (state) => state.chat.tags;

export const selectPrompts = (state) => state.chat.prompts;

export const selectSelectedPrompt = (state) => state.chat.selectedPrompt;
