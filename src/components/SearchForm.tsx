import { useState, type FormEvent } from "react";
import arrowIcon from "../assets/images/icon-arrow.svg";

interface SearchFormProps {
  isLoading: boolean;
  onSearch: (searchTerm: string) => Promise<void>;
}

function isValidSearch(searchTerm: string): boolean {
  const ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;
  const domainPattern =
    /^(?!-)(?:[a-zA-Z0-9-]{1,63}\.)+[a-zA-Z]{2,}$/;

  if (ipPattern.test(searchTerm)) {
    return searchTerm
      .split(".")
      .every((number) => Number(number) >= 0 && Number(number) <= 255);
  }

  return domainPattern.test(searchTerm);
}

function SearchForm({
  isLoading,
  onSearch,
}: SearchFormProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [validationError, setValidationError] = useState("");

  async function handleSubmit(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    const cleanedSearch = searchTerm.trim();

    if (!cleanedSearch) {
      setValidationError("Please enter an IP address or domain.");
      return;
    }

    if (!isValidSearch(cleanedSearch)) {
      setValidationError(
        "Please enter a valid IP address or domain.",
      );
      return;
    }

    setValidationError("");
    await onSearch(cleanedSearch);
  }

  return (
    <form
      className="search-form"
      onSubmit={handleSubmit}
      noValidate
    >
      <label className="sr-only" htmlFor="ip-search">
        Search for an IP address or domain
      </label>

      <input
        id="ip-search"
        type="text"
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        placeholder="Search for any IP address or domain"
        aria-describedby={
          validationError ? "search-error" : undefined
        }
        aria-invalid={Boolean(validationError)}
        autoComplete="off"
        spellCheck={false}
      />

      <button
        type="submit"
        disabled={isLoading}
        aria-label={isLoading ? "Searching" : "Search"}
      >
        <img src={arrowIcon} alt="" />
      </button>

      {validationError && (
        <p id="search-error" className="form-error" role="alert">
          {validationError}
        </p>
      )}
    </form>
  );
}

export default SearchForm;