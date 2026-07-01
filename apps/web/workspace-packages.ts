export const registeredToolWorkspacePackages = [
  '@pastemorphbox/tool-time',
  '@pastemorphbox/tool-color',
  '@pastemorphbox/tool-json',
  '@pastemorphbox/tool-url',
  '@pastemorphbox/tool-base64',
  '@pastemorphbox/tool-jwt',
  '@pastemorphbox/tool-uuid',
  '@pastemorphbox/tool-hash',
  '@pastemorphbox/tool-html-entities',
  '@pastemorphbox/tool-extract',
  '@pastemorphbox/tool-table',
  '@pastemorphbox/tool-text',
] as const

export const workspaceTranspilePackages = [
  '@pastemorphbox/core',
  '@pastemorphbox/registry',
  ...registeredToolWorkspacePackages,
  '@pastemorphbox/ui',
] as const
