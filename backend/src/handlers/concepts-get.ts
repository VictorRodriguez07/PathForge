import { APIGatewayProxyEventV2 } from "aws-lambda";
import { prisma } from "../infrastructure/prisma";

export const handler = async (event: APIGatewayProxyEventV2) => {
  try {
    const subjectSlug = event.pathParameters?.subjectSlug;

    if (!subjectSlug) {
      return {
        statusCode: 400,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "subjectSlug requerido" }),
      };
    }

    const subject = await prisma.subject.findUnique({
      where: { slug: subjectSlug },
    });

    if (!subject) {
      return {
        statusCode: 404,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: "Tecnología no encontrada" }),
      };
    }

    const concepts = await prisma.concept.findMany({
      where: { subjectId: subject.id },
      orderBy: [{ level: "asc" }, { name: "asc" }],
      select: {
        slug: true,
        name: true,
        level: true,
      },
    });

    const grouped = {
      BEGINNER: concepts.filter((c) => c.level === "BEGINNER"),
      INTERMEDIATE: concepts.filter((c) => c.level === "INTERMEDIATE"),
      ADVANCED: concepts.filter((c) => c.level === "ADVANCED"),
    };

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ concepts: grouped }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: "Error interno del servidor" }),
    };
  }
};