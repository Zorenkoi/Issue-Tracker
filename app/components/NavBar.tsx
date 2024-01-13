"use client";
import { Avatar, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import classnames from "classnames";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AiFillBug } from "react-icons/ai";

const NavBar = () => {
  return (
    <nav className="border-b mb-6 py-4">
      <Flex justify={"between"} className="wrapper">
        <Flex gap={"5"} align={"center"}>
          <Link href={"/"}>
            <AiFillBug />
          </Link>

          <NavLinks />
        </Flex>

        <AuthStatus />
      </Flex>
    </nav>
  );
};

const NavLinks = () => {
  const links = [
    { label: "Dashboard", href: "/" },
    { label: "Issues", href: "/issues" },
  ];

  const currentPath = usePathname();

  return (
    <ul className="flex gap-x-5">
      {links.map((link) => {
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              className={classnames({
                "nav-link": currentPath !== link.href,
                "nav-link-active": currentPath === link.href,
              })}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

const AuthStatus = () => {
  const { status, data: session } = useSession();

  if (status === "loading") return null;

  if (status === "authenticated") {
    return (
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          <Avatar
            src={session.user?.image!}
            fallback={"?"}
            radius="full"
            size={"3"}
            referrerPolicy="no-referrer"
          />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Label>
            <Text>{session.user?.email!}</Text>
          </DropdownMenu.Label>

          <DropdownMenu.Item>
            <Link href="/api/auth/signout">Log out</Link>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    );
  }

  return (
    <Link className="nav-link" href="/api/auth/signin">
      Log in
    </Link>
  );
};

export default NavBar;
