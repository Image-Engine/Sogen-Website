"use client";

import NextLink from "next/link";
import {
  useRouter,
  usePathname,
  useParams,
  useSearchParams as useNextSearchParams,
} from "next/navigation";
import { useEffect, type ComponentProps } from "react";

type LinkProps = Omit<ComponentProps<typeof NextLink>, "href"> & {
  to: string;
};

export function Link({ to, ...props }: LinkProps) {
  return <NextLink href={to} {...props} />;
}

export function useNavigate() {
  const router = useRouter();
  return (to: string | number, options?: { replace?: boolean }) => {
    if (typeof to === "number") {
      window.history.go(to);
      return;
    }
    if (options?.replace) router.replace(to);
    else router.push(to);
  };
}

export function useLocation() {
  const pathname = usePathname() ?? "/";
  const search =
    typeof window !== "undefined" ? window.location.search : "";
  return { pathname, search, hash: "", state: null, key: "default" };
}

export { useParams };

type SetSearchParams = (
  init: URLSearchParams | Record<string, string> | string,
  options?: { replace?: boolean },
) => void;

export function useSearchParams(): [
  ReturnType<typeof useNextSearchParams>,
  SetSearchParams,
] {
  const params = useNextSearchParams();
  const router = useRouter();
  const pathname = usePathname() ?? "/";

  const setSearchParams: SetSearchParams = (init, options) => {
    let search: string;
    if (typeof init === "string") {
      search = init.startsWith("?") ? init.slice(1) : init;
    } else if (init instanceof URLSearchParams) {
      search = init.toString();
    } else {
      search = new URLSearchParams(init).toString();
    }
    const url = search ? `${pathname}?${search}` : pathname;
    if (options?.replace) router.replace(url);
    else router.push(url);
  };

  return [params, setSearchParams];
}

export function Navigate({ to, replace }: { to: string; replace?: boolean }) {
  const router = useRouter();
  useEffect(() => {
    if (replace) router.replace(to);
    else router.push(to);
  }, [router, to, replace]);
  return null;
}
