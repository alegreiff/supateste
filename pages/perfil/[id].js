import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Image,
  Input,
  Link,
  Select,
  VStack,
} from "@chakra-ui/react";
import { supabaseClient, withPageAuth } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/router";
import { UploadAvatar } from "../../components/AvatarCustom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import useDatosPollero from "../../storedata/pollero";

export default function PerfilUserPage({ user, equipos, favoritos }) {
  console.log(favoritos);
  const [profile, setProfile] = useState(null);
  const [imagen, setImagen] = useState(null);
  const [nuevaIMG, setnuevaIMG] = useState(null);
  const [random, setRandom] = useState(Math.random);
  const [upload, setUpload] = useState(true);
  const router = useRouter();
  const { id } = router.query;
  const { setImagenPerfil, setPerfilUsuario } = useDatosPollero(
    (state) => state
  );

  useEffect(() => {
    async function getImage(userid) {
      const ruta = `${userid}/perfil.png`;
      const { data, error } = await supabaseClient.storage
        .from("polleres")
        .download(ruta);
      if (data) {
        console.log("PREVIMAGOS", data);
        //setFotoPerfil();
        const { publicURL, error } = supabaseClient.storage
          .from("polleres")
          .getPublicUrl(ruta);
        if (publicURL) {
          setImagen(publicURL + "?poll=" + random);
          setUpload(false);
        }
      } else {
        console.log("NOTIMAGOS", error);
      }
    }
    async function loadPerfil() {
      const { data: perfil, error } = await supabaseClient
        .from("usuarios")
        .select("*")
        .eq("id", user.id)
        .single();

      if (perfil) {
        setProfile(perfil);
        //setPerfilUsuario(perfil);
      }
    }
    // Only run query once user is logged in.
    if (user) {
      loadPerfil();
      getImage(user?.id);
    }
  }, [user]);

  const formik = useFormik({
    initialValues: {
      hinchade: profile?.hincha ? profile.hincha : "",
      polleroalias: profile?.alias ? profile.alias : "",
      userId: user?.id,
      favorito: profile?.favorito ? profile?.favorito : "",
      pollerofoto: "",
    },
    enableReinitialize: true,

    validationSchema: Yup.object({
      polleroalias: Yup.string()
        .required("Nombre de pollero requerido")
        .min(6, "Mínimo seis caracteres")
        .max(20, "Máximo 20 caracteres"),
      hinchade: Yup.string().required("Seleccione una opción"),
      favorito: Yup.string().required("Seleccione su equipo más querido"),
    }),
    onSubmit: async (values, actions) => {
      if (upload) {
        const { data, error } = await supabaseClient.storage
          .from("polleres")
          .upload(`${user?.id}/perfil.png`, nuevaIMG, {
            cacheControl: "3600",
            upsert: false,
          });
        if (data) {
          setUpload(false);
          setRandom(Math.random);
          let imagenUp = data?.Key + "?polla=" + random;
          setImagenPerfil(imagenUp);
        }
        console.log(data, error);
      } else {
        if (nuevaIMG) {
          const { data, error } = await supabaseClient.storage
            .from("polleres")
            .update(`${user?.id}/perfil.png`, nuevaIMG, {
              cacheControl: "3600",
              upsert: false,
            });
          if (data) {
            setRandom(Math.random);

            let imagenUp = data?.Key + "?polla=" + random;
            setImagenPerfil(imagenUp);
          }
          console.log(data, error);
        } else {
          console.log("Sin cambios de Imaghen parse");
        }
      }

      const { data, error } = await supabaseClient
        .from("usuarios")
        .update({
          hincha: values.hinchade,
          alias: values.polleroalias,
          favorito: values.favorito,
        })
        .eq("id", user?.id)
        .single();
      if (data) {
        setProfile(data);
        setPerfilUsuario(data);
        //actions.resetForm();
      }
      if (error) {
        console.log(error);
      }
    },
  });

  console.log(equipos, favoritos);
  return (
    <VStack
      as="form"
      justifyContent="center"
      mx="auto"
      h="100vh"
      w={{ base: "90%", md: 500 }}
      onSubmit={formik.handleSubmit}
    >
      {imagen && <Image src={imagen} alt="Pollero" boxSize="nd" />}
      <Heading>Perfil {profile?.alias} </Heading>

      <FormControl
        isInvalid={formik.errors.hinchade && formik.touched.hinchade}
      >
        <FormLabel>Hincha de</FormLabel>
        <Select
          placeholder="¿De quién es hincha en Colombia?"
          name="hinchade"
          value={formik.values.hinchade}
          {...formik.getFieldProps("hinchade")}
        >
          {equipos &&
            equipos.map((eq, i) => (
              <option key={i} value={eq.nombre}>
                {eq.nombre}
              </option>
            ))}
        </Select>
        <FormErrorMessage>{formik.errors.hinchade}</FormErrorMessage>
      </FormControl>
      <FormControl
        isInvalid={formik.errors.favorito && formik.touched.favorito}
      >
        <FormLabel>Mi favorito es...</FormLabel>
        <Select
          placeholder="El campeón será"
          name="favorito"
          value={formik.values.favorito}
          {...formik.getFieldProps("favorito")}
        >
          {favoritos &&
            favoritos.map((eq) => (
              <option key={eq.id} value={eq.id}>
                {eq.nombre}
              </option>
            ))}
        </Select>
        <FormErrorMessage>{formik.errors.hinchade}</FormErrorMessage>
      </FormControl>
      <FormControl
        isInvalid={formik.errors.polleroalias && formik.touched.polleroalias}
      >
        <Input
          name="polleroalias"
          placeholder="Su nombre único e irrepetible como pollero"
          value={formik.values.polleroalias}
          {...formik.getFieldProps("polleroalias")}
          disabled={profile?.alias ? true : false}
        ></Input>

        <FormErrorMessage>{formik.errors.polleroalias}</FormErrorMessage>
      </FormControl>
      <FormControl>
        <Input
          name="userId"
          value={formik.values.userId}
          {...formik.getFieldProps("userId")}
          disabled
        ></Input>
      </FormControl>
      <UploadAvatar
        imagen={imagen}
        setImagen={setImagen}
        setnuevaIMG={setnuevaIMG}
      />

      <Button type="submit" variant="outline" colorScheme="teal">
        Guardar perfil
      </Button>
    </VStack>
  );
}

export const getServerSideProps = withPageAuth({
  redirectTo: "/",
  async getServerSideProps(ctx) {
    const { data: equipos } = await supabaseClient
      .from("listahinchas")
      .select(`nombre:unnest`);
    const { data: favoritos } = await supabaseClient
      .from("equipos")
      .select("id, nombre")
      .order("nombre");

    return { props: { equipos, favoritos } };
  },
});
