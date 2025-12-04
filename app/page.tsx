"use client";

import {
  Container,
  Header,
  MessageList,
  Composer,
  useWebchat,
  Fab,
  Webchat,
} from "@botpress/webchat";
import { useState, useMemo } from "react";
import "./webchat-styles.css";
//dummy
const headerConfig = {
  botName: "Botpress",
  botAvatar:
    "https://yt3.googleusercontent.com/dK-1H-YWYuaRa7uq-dbPnICGzKnn20mGOFs9-2YjB0ugI-zSpRzqa7L4yI6QL3awboH3Ggs0cQ=s900-c-k-c0x00ffffff-no-rj",

  website: {
    title: "Talk to Sales",
    link: "https://botpress.com/contact-us?ref=web-bot",
  },

  termsOfService: {
    title: "Terms of Service",
    link: "https://botpress.com/legal/terms-of-service",
  },

  privacyPolicy: {
    title: "Privacy Statement",
    link: "https://botpress.com/legal/privacy-statement",
  },
};

export default function Home() {
  const [isWebchatOpen, setIsWebchatOpen] = useState(true);
  const { client, messages, isTyping, user, clientState, newConversation } =
    useWebchat({
      clientId: "2f5a29ff-c8c2-43c2-94cb-afa173526f7a", // Insert your Client ID here
    });

  const config = {
    botName: "Welcome to Botpress",
    botAvatar: headerConfig.botAvatar,
    botDescription: "How can we help you today?",
  };
  const enrichedMessages = useMemo(
    () =>
      messages.map((message) => {
        const { authorId } = message;
        const direction = authorId === user?.userId ? "outgoing" : "incoming";
        return {
          ...message,
          direction,
          sender:
            direction === "outgoing"
              ? { name: user?.name ?? "You", avatar: user?.pictureUrl }
              : { name: config.botName ?? "Bot", avatar: config.botAvatar },
        };
      }),
    [
      config.botAvatar,
      config.botName,
      messages,
      user?.userId,
      user?.name,
      user?.pictureUrl,
    ]
  );

  const toggleWebchat = () => {
    setIsWebchatOpen((prevState) => !prevState);
  };

  return (
    <>
      <Webchat clientId="2f5a29ff-c8c2-43c2-94cb-afa173526f7a" />

      {/*     
      <Container
        connected={clientState !== "disconnected"}
        style={{ display: isWebchatOpen ? "flex" : "none" }}
        id="bp-webchat"
      >
        <Header
          // onOpenChange={() => console.log('Override the header open change')}
          defaultOpen={false}
          closeWindow={() => setIsWebchatOpen(false)}
          restartConversation={newConversation}
          disabled={false}
          configuration={headerConfig}
        />
        <MessageList
          // botAvatar={config.botAvatar}
          botName={config.botName}
          botDescription={config.botDescription}
          isTyping={isTyping}
          showMarquee={true}
          messages={enrichedMessages}
          sendMessage={client?.sendMessage}
        />
        <Composer
          disableComposer={false}
          isReadOnly={false}
          allowFileUpload={true}
          connected={clientState !== "disconnected"}
          sendMessage={client?.sendMessage}
          uploadFile={client?.uploadFile}
          composerPlaceholder="Type a message..."
        />
      </Container> */}
      <Fab onClick={() => toggleWebchat()} />
    </>
  );
}
