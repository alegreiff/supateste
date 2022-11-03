import {
  Badge,
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
} from "@chakra-ui/react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useRef, useState } from "react";
import useDatosPollero from "../storedata/pollero";

export default function PollaChat() {
  const [messages, setMessages] = useState([]);
  const [mensajes, setMensajes] = useState([]);
  const message = useRef("");
  const messagesEndRef = useRef(null);

  const { usuario, polleros } = useDatosPollero((state) => state);
  console.log(polleros);

  useEffect(() => {
    const msgs = messages;
    msgs.map((msg) => {
      msg.alias = polleros.find((pollero) => pollero.id === msg.user_id)?.alias;
    });
    setMensajes(msgs);
    scrollToBottom();
  }, [messages, polleros]);

  useEffect(() => {
    const getMessages = async () => {
      let { data: messages, error } = await supabaseClient
        .from("message")
        .select("*");

      setMessages(messages);
    };

    const message = supabaseClient
      .from("message")
      .on("INSERT", (payload) => {
        console.log("Change received!", payload);
        setMessages((previous) => [].concat(previous, payload.new));
        //setMessages([].concat(messages, payload.new));
      })
      .subscribe();

    getMessages();
  }, []);
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    console.log("escrolink");
  };
  const sendMessage = async (event) => {
    event.preventDefault();
    const content = message.current.value;
    const { data, error } = await supabaseClient
      .from("message")
      .insert([{ content, user_id: usuario?.id }]);

    message.current.value = "";
  };

  return (
    <>
      <div className="midivi">
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta
          blanditiis iure nemo incidunt error perferendis commodi sed,
          accusantium eveniet quasi dolor pariatur odit aut vero magnam qui
          illum sint cum.Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Dicta blanditiis iure nemo incidunt error perferendis commodi
          sed, accusantium eveniet quasi dolor pariatur odit aut vero magnam qui
          illum sint cum.Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Dicta blanditiis iure nemo incidunt error perferendis commodi
          sed, accusantium eveniet quasi dolor pariatur odit aut vero magnam qui
          illum sint cum.Lorem ipsum dolor sit amet consectetur adipisicing
          elit. Dicta blanditiis iure nemo incidunt error perferendis commodi
          sed, accusantium eveniet quasi dolor pariatur odit aut vero magnam qui
          illum sint cum.
        </p>
        {mensajes.map((message) => (
          <div key={message.id}>
            (
            <>
              <Badge>{message.alias}</Badge>
              {message.content}
            </>
            ){" "}
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      <HStack>
        <form onSubmit={sendMessage}>
          <FormControl>
            <FormLabel>Mensaje</FormLabel>
            <Input type="text" required ref={message} />
            <FormHelperText>Corto y contundente</FormHelperText>
          </FormControl>
          <Button type="submit">Zas!</Button>
        </form>
      </HStack>
    </>
  );
}

/*



*/
