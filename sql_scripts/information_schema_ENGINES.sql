insert into information_schema.ENGINES (ENGINE, SUPPORT, COMMENT, TRANSACTIONS, XA, SAVEPOINTS) values ('ARCHIVE', 'YES', 'Archive storage engine', 'NO', 'NO', 'NO');
insert into information_schema.ENGINES (ENGINE, SUPPORT, COMMENT, TRANSACTIONS, XA, SAVEPOINTS) values ('BLACKHOLE', 'YES', '/dev/null storage engine (anything you write to it disappears)', 'NO', 'NO', 'NO');
insert into information_schema.ENGINES (ENGINE, SUPPORT, COMMENT, TRANSACTIONS, XA, SAVEPOINTS) values ('MRG_MYISAM', 'YES', 'Collection of identical MyISAM tables', 'NO', 'NO', 'NO');
insert into information_schema.ENGINES (ENGINE, SUPPORT, COMMENT, TRANSACTIONS, XA, SAVEPOINTS) values ('FEDERATED', 'NO', 'Federated MySQL storage engine', null, null, null);
insert into information_schema.ENGINES (ENGINE, SUPPORT, COMMENT, TRANSACTIONS, XA, SAVEPOINTS) values ('MyISAM', 'YES', 'MyISAM storage engine', 'NO', 'NO', 'NO');
insert into information_schema.ENGINES (ENGINE, SUPPORT, COMMENT, TRANSACTIONS, XA, SAVEPOINTS) values ('PERFORMANCE_SCHEMA', 'YES', 'Performance Schema', 'NO', 'NO', 'NO');
insert into information_schema.ENGINES (ENGINE, SUPPORT, COMMENT, TRANSACTIONS, XA, SAVEPOINTS) values ('InnoDB', 'DEFAULT', 'Supports transactions, row-level locking, and foreign keys', 'YES', 'YES', 'YES');
insert into information_schema.ENGINES (ENGINE, SUPPORT, COMMENT, TRANSACTIONS, XA, SAVEPOINTS) values ('MEMORY', 'YES', 'Hash based, stored in memory, useful for temporary tables', 'NO', 'NO', 'NO');
insert into information_schema.ENGINES (ENGINE, SUPPORT, COMMENT, TRANSACTIONS, XA, SAVEPOINTS) values ('CSV', 'YES', 'CSV storage engine', 'NO', 'NO', 'NO');
