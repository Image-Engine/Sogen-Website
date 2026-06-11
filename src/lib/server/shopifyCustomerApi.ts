function formatAccessToken(token: string): string {
  if (token.startsWith("shcat_")) return token;
  return `shcat_${token}`;
}

export async function customerGql(
  storeId: string,
  accessToken: string,
  query: string,
  variables: Record<string, unknown> = {},
) {
  const url = `https://shopify.com/${storeId}/account/customer/api/2025-01/graphql`;
  const formattedToken = formatAccessToken(accessToken);
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: formattedToken,
    },
    body: JSON.stringify({ query, variables }),
  });
  const data = await res.json();
  if (data.errors) {
    throw new Error(
      data.errors.map((e: { message: string }) => e.message).join(", "),
    );
  }
  return data.data;
}
