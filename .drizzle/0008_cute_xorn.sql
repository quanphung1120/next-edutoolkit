/*
 SQLite does not support "Changing existing column type" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html
                  https://stackoverflow.com/questions/2083543/modify-a-columns-type-in-sqlite3

 Due to that we don't generate migration automatically and it has to be done manually
*/
DROP TABLE `magic_link`;

CREATE TABLE `magic_link` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`token_verifier` text NOT NULL,
	`verification_token` text NOT NULL,
	`expires_at` integer NOT NULL,
	`timestamp` text DEFAULT (CURRENT_TIMESTAMP)
);