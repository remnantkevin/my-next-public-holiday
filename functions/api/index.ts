export const onRequest: PagesFunction<{
  DATA: KVNamespace;
  TEST: KVNamespace;
}> = async ({ request, env }) => {
  try {
    if (!request.cf)
      throw new Error("No 'cf' properties found on incoming Request.");

    const { country, regionCode } = request.cf;

    const kv = await env.TEST.get("akey", "text");

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
