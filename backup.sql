--
-- PostgreSQL database dump
--

-- Dumped from database version 14.17 (Homebrew)
-- Dumped by pg_dump version 14.17 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: update_timestamp(); Type: FUNCTION; Schema: public; Owner: nikita
--

CREATE FUNCTION public.update_timestamp() RETURNS trigger
    LANGUAGE plpgsql
    AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$;


ALTER FUNCTION public.update_timestamp() OWNER TO nikita;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: nikita
--

CREATE TABLE public.categories (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP
);


ALTER TABLE public.categories OWNER TO nikita;

--
-- Name: categories_id_seq; Type: SEQUENCE; Schema: public; Owner: nikita
--

CREATE SEQUENCE public.categories_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.categories_id_seq OWNER TO nikita;

--
-- Name: categories_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nikita
--

ALTER SEQUENCE public.categories_id_seq OWNED BY public.categories.id;


--
-- Name: items; Type: TABLE; Schema: public; Owner: nikita
--

CREATE TABLE public.items (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    description text,
    price numeric(10,2) NOT NULL,
    quantity integer DEFAULT 0 NOT NULL,
    author character varying(255),
    isbn character varying(20),
    category_id integer,
    created_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT items_price_check CHECK ((price >= (0)::numeric)),
    CONSTRAINT items_quantity_check CHECK ((quantity >= 0))
);


ALTER TABLE public.items OWNER TO nikita;

--
-- Name: items_id_seq; Type: SEQUENCE; Schema: public; Owner: nikita
--

CREATE SEQUENCE public.items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.items_id_seq OWNER TO nikita;

--
-- Name: items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: nikita
--

ALTER SEQUENCE public.items_id_seq OWNED BY public.items.id;


--
-- Name: categories id; Type: DEFAULT; Schema: public; Owner: nikita
--

ALTER TABLE ONLY public.categories ALTER COLUMN id SET DEFAULT nextval('public.categories_id_seq'::regclass);


--
-- Name: items id; Type: DEFAULT; Schema: public; Owner: nikita
--

ALTER TABLE ONLY public.items ALTER COLUMN id SET DEFAULT nextval('public.items_id_seq'::regclass);


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: nikita
--

COPY public.categories (id, name, description, created_at, updated_at) FROM stdin;
2	Fiction	Books that contain stories created from the imagination of the author.	2025-03-28 12:30:00.513156	2025-03-28 12:30:00.513156
3	Non-Fiction	Books that provide factual information and real-life events.	2025-03-28 12:30:00.513156	2025-03-28 12:30:00.513156
4	Mystery	Books that involve solving a crime or uncovering a secret.	2025-03-28 12:30:00.513156	2025-03-28 12:30:00.513156
5	Science Fiction	Books that explore futuristic concepts and advanced technology.	2025-03-28 12:30:00.513156	2025-03-28 12:30:00.513156
6	Fantasy	Books that include magical elements and mythical creatures.	2025-03-28 12:30:00.513156	2025-03-28 12:30:00.513156
\.


--
-- Data for Name: items; Type: TABLE DATA; Schema: public; Owner: nikita
--

COPY public.items (id, name, description, price, quantity, author, isbn, category_id, created_at, updated_at) FROM stdin;
2	Sapiens: A Brief History of Humankind	A book by Yuval Noah Harari exploring the history of humanity.	15.99	50	Yuval Noah Harari	9780062316110	2	2025-03-28 12:30:00.514527	2025-03-28 12:30:00.514527
3	Gone Girl	A thriller novel by Gillian Flynn about a woman who goes missing.	12.99	75	Gillian Flynn	9780307588371	3	2025-03-28 12:30:00.514527	2025-03-28 12:30:00.514527
4	Dune	A science fiction novel by Frank Herbert set in a distant future.	14.99	60	Frank Herbert	9780441013593	4	2025-03-28 12:30:00.514527	2025-03-28 12:30:00.514527
5	Harry Potter and the Sorcerer's Stone	The first book in J.K. Rowling's Harry Potter series.	9.99	200	J.K. Rowling	9780590353427	5	2025-03-28 12:30:00.514527	2025-03-28 12:30:00.514527
1	The Great Gatsby	A novel written by American author F. Scott Fitzgerald.	10.99	100	F. Scott Fitzgerald	9780743273565	\N	2025-03-28 12:30:00.514527	2025-03-28 14:50:08.23468
\.


--
-- Name: categories_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nikita
--

SELECT pg_catalog.setval('public.categories_id_seq', 6, true);


--
-- Name: items_id_seq; Type: SEQUENCE SET; Schema: public; Owner: nikita
--

SELECT pg_catalog.setval('public.items_id_seq', 5, true);


--
-- Name: categories categories_name_key; Type: CONSTRAINT; Schema: public; Owner: nikita
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_name_key UNIQUE (name);


--
-- Name: categories categories_pkey; Type: CONSTRAINT; Schema: public; Owner: nikita
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT categories_pkey PRIMARY KEY (id);


--
-- Name: items items_isbn_key; Type: CONSTRAINT; Schema: public; Owner: nikita
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_isbn_key UNIQUE (isbn);


--
-- Name: items items_pkey; Type: CONSTRAINT; Schema: public; Owner: nikita
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_pkey PRIMARY KEY (id);


--
-- Name: idx_items_category; Type: INDEX; Schema: public; Owner: nikita
--

CREATE INDEX idx_items_category ON public.items USING btree (category_id);


--
-- Name: idx_items_category_id; Type: INDEX; Schema: public; Owner: nikita
--

CREATE INDEX idx_items_category_id ON public.items USING btree (category_id);


--
-- Name: idx_items_isbn; Type: INDEX; Schema: public; Owner: nikita
--

CREATE INDEX idx_items_isbn ON public.items USING btree (isbn);


--
-- Name: categories update_categories_timestamp; Type: TRIGGER; Schema: public; Owner: nikita
--

CREATE TRIGGER update_categories_timestamp BEFORE UPDATE ON public.categories FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- Name: items update_items_timestamp; Type: TRIGGER; Schema: public; Owner: nikita
--

CREATE TRIGGER update_items_timestamp BEFORE UPDATE ON public.items FOR EACH ROW EXECUTE FUNCTION public.update_timestamp();


--
-- Name: items items_category_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: nikita
--

ALTER TABLE ONLY public.items
    ADD CONSTRAINT items_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.categories(id) ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

