# Generated by Django 4.2 on 2023-05-10 15:03

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0002_alter_genre_name'),
    ]

    operations = [
        migrations.AlterField(
            model_name='genre',
            name='name',
            field=models.CharField(max_length=150, unique=True, verbose_name='Имя'),
        ),
    ]