"use server";

import prisma from "../../../../lib/prisma";

export const getCityFilter = async () => {
  try {
    const res = await prisma.flight.groupBy({
      by: ["departureCity", "destinationCity"],
      where: {
        departureDate: {
          gt: new Date(),
        },
      },
      _count: {
        departureCity: true,
        destinationCity: true,
      },
    });

    return res;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getAirplanes = async () => {
  try {
    const res = await prisma.airplane.findMany({
      where: {
        flight: {
          every: {
            id: undefined,
          },
        },
      },
    });

    return res;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const getFlightById = async (id: string) => {
  try {
    const data = await prisma.flight.findFirst({
      where: {
        id,
      },
      include: {
        seats: {
          orderBy: {
            seatNumber: "asc",
          },
        },
        plane: true,
      },
    });

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
};
