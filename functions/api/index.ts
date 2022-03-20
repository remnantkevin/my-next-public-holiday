import { Holiday } from "../../types/holiday";

const onRequest: PagesFunction<{ DATA: KVNamespace }> = async function ({
  request,
  env,
}) {
  try {
    if (!request.cf)
      throw new Error("No 'cf' properties found on incoming Request.");

    const { country, regionCode } = request.cf;

    const holidayData = await env.DATA.get<Holiday[]>(
      `${country}:${regionCode}`,
      {
        type: "json",
      }
    );

    if (!holidayData) throw new Error("No holiday data found.");

    return new Response(JSON.stringify(holidayData[1]));
  } catch (e) {
    return new Response(JSON.stringify(e, Object.getOwnPropertyNames(e)));
  }
};

export default onRequest;
