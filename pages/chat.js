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
import { getHours, getMinutes } from "date-fns";
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
        .select("*")
        .order("id", { ascending: false })
        .limit(10);

      setMessages(messages.reverse());
      scrollToBottom();
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

  function padTo2Digits(num) {
    return String(num).padStart(2, "0");
  }

  const muestraFecha = (f) => {
    const fecha = new Date(f);
    const y =
      padTo2Digits(fecha.getHours()) + ":" + padTo2Digits(fecha.getMinutes());

    const h = getHours(fecha);
    const m = getMinutes(fecha);
    //return h + ":" + m;
    return y;
  };
  return (
    <>
      <div className="midivi">
        {mensajes.map((message) => (
          <div key={message.id}>
            <>
              <Badge
                colorScheme={
                  message.user_id === usuario.id ? "orange" : "facebook"
                }
              >
                {message.alias}
              </Badge>
              <Badge> {muestraFecha(message.created_at)} </Badge>

              <Box as="span" ml="4">
                {message.content}
              </Box>
            </>
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage}>
        <HStack>
          <FormControl w="400px">
            <FormLabel>Mensaje</FormLabel>
            <Input type="text" required ref={message} />
            <FormHelperText>Corto y contundente</FormHelperText>
          </FormControl>
          <Button type="submit">Zas!</Button>
        </HStack>
      </form>
    </>
  );
}

/*



*/
