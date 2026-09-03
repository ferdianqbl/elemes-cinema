import { describe, it, expect, beforeEach } from "vitest";
import { useUiStore } from "../use-ui-store";

describe("useUiStore", () => {
  beforeEach(() => {
    useUiStore.setState({ isSearchOpen: false, isMobileMenuOpen: false });
  });

  it("toggles search modal correctly", () => {
    expect(useUiStore.getState().isSearchOpen).toBe(false);
    useUiStore.getState().openSearch();
    expect(useUiStore.getState().isSearchOpen).toBe(true);
    useUiStore.getState().closeSearch();
    expect(useUiStore.getState().isSearchOpen).toBe(false);
    useUiStore.getState().toggleSearch();
    expect(useUiStore.getState().isSearchOpen).toBe(true);
  });

  it("toggles mobile menu correctly", () => {
    expect(useUiStore.getState().isMobileMenuOpen).toBe(false);
    useUiStore.getState().openMobileMenu();
    expect(useUiStore.getState().isMobileMenuOpen).toBe(true);
    useUiStore.getState().closeMobileMenu();
    expect(useUiStore.getState().isMobileMenuOpen).toBe(false);
    useUiStore.getState().toggleMobileMenu();
    expect(useUiStore.getState().isMobileMenuOpen).toBe(true);
  });
});
