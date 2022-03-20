export const onRequest: PagesFunction<{
  DATA: KVNamespace;
  PETER: KVNamespace;
}> = async ({ request, env }) => {
  try {
    if (!request.cf)
      throw new Error("No 'cf' properties found on incoming Request.");

    const { country, regionCode } = request.cf;

    const kv = await env.PETER.get("YES", "text");

    // if (!holidayData) throw new Error("No holiday data found.");

    return new Response(JSON.stringify({ kv }));
  } catch (e) {
    return new Response(
      JSON.stringify({
        error: JSON.stringify(e, Object.getOwnPropertyNames(e)),
        request,
        env,
      })
    );
  }
};
