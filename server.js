import "dotenv/config";
import express from "express";
import {
  S3Client,
  GetObjectCommand,
  ListObjectsV2Command,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { createPresignedPost } from "@aws-sdk/s3-presigned-post";

const app = express();

// Subindo o front end da aplicação
app.use(express.static('public'));

// Configuração do cliente S3
const s3Client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});


// Endpoint para gerar URLs pré-assinadas para download de arquivos
app.get("/generate-presigned-get-urls", async (req, res) => {
  try {
    // Idealmente buscarímos os nomes dos arquivos de alguma tabela no banco de dados,
    // mas por questões de praticidades, vamos listar todos arquivos do bucket.
    const listObjectsCommand = new ListObjectsV2Command({
      Bucket: process.env.AWS_BUCKET_NAME,
    });
    const { Contents } = await s3Client.send(listObjectsCommand);

    // Se não houver arquivos, retornamos um array vazio
    if (!Contents) {
      return res.json([]);
    }

    // Geramos uma URL pré-assinada para cada arquivo
    const urls = await Promise.all(
      Contents.map(async (file) => {
        const command = new GetObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: file.Key,
        });

        const url = await getSignedUrl(s3Client, command, {
          expiresIn: 300, // Expira em 5 minutos
        });

        return url;
      })
    );

    res.json(urls);
  } catch (error) {
    console.error("Erro ao listar arquivos ou gerar URLs pré-assinadas:", error);
    res.status(500).send("Erro ao listar arquivos ou gerar URLs pré-assinadas.");
  }
});

// Endpoint para gerar URL pré-assinada para upload de arquivos
app.get("/generate-presigned-post-url", async (req, res) => {
  // Define o diretório e nome do arquivo no bucket
  const key = `uploads/${Date.now()}-arquivo`;

  try {
    // Cria uma URL pré-assinada para upload de arquivos
    const { url, fields } = await createPresignedPost(s3Client, {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
      Expires: 300, // Expira em 5 minutos,
      // Conditions: ... // É possível setar condições como tamanho máximo do arquivo, tipo de arquivo, etc.
    });

    res.json({ url, fields });
  } catch (error) {
    console.error("Error generating pre-signed POST:", error);
    res.status(500).send("Failed to generate POST data");
  }
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando. Acesse o endereço http://localhost:${PORT} para acessar a interface gráfica`);
});
