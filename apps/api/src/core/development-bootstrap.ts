export const DEVELOPMENT_BOOTSTRAP_VERSION = "companylab.development-bootstrap/0.1.0" as const;
export const DEFAULT_DEVELOPMENT_WORKSPACE_ID = "WS-ACME-DEMO" as const;
export const DEFAULT_DEVELOPMENT_PRINCIPAL_ID = "DEV-COMPANYOPS-OPERATOR" as const;
export const DEFAULT_DEVELOPMENT_WORKSPACE_NAME = "Acme Business CI Lab" as const;
export const ACME_DEVELOPMENT_PACKAGE_ID = "PKG-acme-industrial-f1-v1.1" as const;

export interface DevelopmentBootstrapPlan {
  bootstrap_version: typeof DEVELOPMENT_BOOTSTRAP_VERSION;
  workspace: { workspace_id: string; name: string };
  principal: { principal_id: string; role: "OWNER" };
  company_package: { package_id: typeof ACME_DEVELOPMENT_PACKAGE_ID; fixture: string };
}

export function buildDevelopmentBootstrapPlan(input: {
  workspaceId?: string;
  workspaceName?: string;
  principalId?: string;
} = {}): DevelopmentBootstrapPlan {
  return {
    bootstrap_version: DEVELOPMENT_BOOTSTRAP_VERSION,
    workspace: {
      workspace_id: input.workspaceId ?? DEFAULT_DEVELOPMENT_WORKSPACE_ID,
      name: input.workspaceName ?? DEFAULT_DEVELOPMENT_WORKSPACE_NAME,
    },
    principal: {
      principal_id: input.principalId ?? DEFAULT_DEVELOPMENT_PRINCIPAL_ID,
      role: "OWNER",
    },
    company_package: {
      package_id: ACME_DEVELOPMENT_PACKAGE_ID,
      fixture: "packages/company-model/fixtures/acme-industrial-distributor-v1.1.json",
    },
  };
}

export async function bootstrapPlanSha256(plan: DevelopmentBootstrapPlan): Promise<string> {
  const bytes=new TextEncoder().encode(JSON.stringify(plan));
  const digest=new Uint8Array(await crypto.subtle.digest("SHA-256",bytes));
  return [...digest].map(x=>x.toString(16).padStart(2,"0")).join("");
}
